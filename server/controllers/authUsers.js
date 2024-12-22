import catchAsync from '../utils/catchAsync.js';
import validator from 'validator';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../server.js';
import { promisify } from 'util';


const signToken = (user_id) => {
    return jwt.sign({ user_id }, process.env.JWT_SECRET);
}

// register new users
export const regUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    name = validator.trim(name);
    email = validator.isEmail(email);

    if (email === null) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email',
        });
    }

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const hashedPassword = await bcrypt.hash(password, 12);

    if (existingUser.rows.length) {
        if (existingUser.rows[0].verified) {
            //email already exists
            return res.status(400).json({
                status: 'fail',
                message: 'Email already in use',
            });
        }
        else {
            //rewrite create new user.
            await pool.query('DELETE FROM users WHERE email = $1', [email]);
        }
    }

    //register a new User
    newUser = await pool.query('INSERT INTO users (user_name, email, user_pass) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
    next();
});

//send otp

export const sendOtp = catchAsync(async (req, res, next) => {
    const { user_id } = req.body;
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialCharacters: false,
    });

    const hashedOtp = await bcrypt.hash(otp.toString(), 12);

    const expiry_time = Date.now() + 10 * 60 * 1000;
    const user = await pool.query('UPDATE Users SET otp = $1, otp_expiry = $2 WHERE user_id = $3 RETURNING *', [hashedOtp, expiry_time, user_id]);

    return res.status(200).json({
        status: 'success',
        message: 'OTP sent successfully',
    });

});

//resend-otp
export const resendOtp = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = (await pool.query('SELECT user_id FROM Users WHERE email = $1', [email])).rows;

    if (!user.length) {
        return res.status(400).json({
            status: 'fail',
            message: 'No such email found',
        });
    }

    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialCharacters: false,
    });

    const hashedOtp = await bcrypt.hash(otp.toString(), 12);

    const expiry_time = Date.now() + 10 * 60 * 1000;

    await pool.query('UPDATE Users SET otp = $1, otp_expiry = $2 WHERE email = $3', [hashedOtp, expiry_time, email]);

    res.status(200).json({
        status: 'success',
        message: 'OTP sent successfully',
    });


});



//verify otp

export const verifyOtp = catchAsync(async (req, res, next) => {
    const { email, otp } = req.body;
    const user = await pool.query('SELECT * FROM Users WHERE email = $1 AND otp_expiry > $2', [email, Date.now()]);

    if (user.rows.length === 0) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email or OTP expired',
        });
    }

    if (user.rows[0].verified) {
        return res.status(400).json({
            status: 'fail',
            message: 'Email is already verified',
        });
    }

    const isValid = await bcrypt.compare(otp, user.rows[0].otp);

    if (!isValid) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid OTP',
        });
    }

    const verifiedUser = await pool.query('UPDATE Users SET verified = true AND otp = NULL AND otp_expiry = NULL WHERE email = $1 RETURNING *', [email]);

    const token = signToken(verifiedUser.rows[0].user_id);

    return res.status(200).json({
        status: 'success',
        message: 'Email verified successfully',
        token,
        user_id: verifiedUser.rows[0].user_id,
    });

});

//login
export const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password',
        });
    }

    const user = await pool.query('SELECT user_id, user_pass FROM Users WHERE email = $1', [email]);

    if (user.rows.length === 0 || !user.rows[0].user_pass) {
        return res.status(400).json({
            status: 'fail',
            message: 'No such email found',
        });
    }

    if (user.rows.length) {
        const isValid = await bcrypt.compare(password, user.rows[0].user_pass);

        if (isValid) {
            const token = signToken(user.rows[0].user_id);

            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                token,
                user_id: user.rows[0].user_id,
            });
        }
        else {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid password',
            });
        }
    }

});


//Auth


export const auth = catchAsync(async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in. Please login to get access',
            });
        }

        const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

        console.log(decoded);

        //Check if user still exists
        const currentUser = await pool.query('SELECT * FROM Users WHERE user_id = $1', [decoded.user_id]);

        if (!currentUser) {
            return res.status(401).json({
                message: 'The user belonging to this token does no longer exist',
            });
        }

        const query = `
            SELECT 
                CASE 
                WHEN password_changed_at IS NOT NULL 
                AND EXTRACT(EPOCH FROM pass_changedAt) / 1000 > $1::integer 
                THEN true
                ELSE false
                END as password_changed
            FROM users 
            WHERE id = $2
        `;

        const result = await pool.query(query, [decoded.iat, decoded.user_id]).rows[0].password_changed;
        if (result) {
            return res.status(401).json({
                message: 'User recently changed password. Please login again',
            });
        }

        req.user = currentUser.rows[0];
        next();

    }
    catch (err) {
        console.log(err);
        console.log('Auth failed');
        return res.status(401).json({
            status: 'fail',
            message: 'Auth failed',
        });

    }
});
