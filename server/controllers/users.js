import catchAsync from "../utils/catchAsync.js";
import pool from "../db/db.js";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";

export const getUser = catchAsync(async (req, res, next) => {

    const { user } = req;
    //console.log("In getUser:", req);
    res.status(200).json({
        status: 'success',
        message: 'User found',
        user: user,
    });

});

//Update name and bio
export const updateUser = catchAsync(async (req, res, next) => {

    //console.log(req.body);

    const { name, bio } = req.body;
    //console.log(name, bio);
    const { user_id } = req.body;

    //console.log("User id in users", user_id);
    const updatedUser = await pool.query('UPDATE Users SET user_name = $1, bio = $2 WHERE user_id = $3 RETURNING *', [name, bio, user_id]);

    //console.log(updatedUser.rows);

    if (updatedUser.rows.length === 0) {
        return res.status(400).json({
            status: 'fail',
            message: 'No such user found',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: {
            user: updatedUser.rows[0],
        },
    });

});



//Update avatar
export const updateAvatar = catchAsync(async (req, res, next) => {

    const { avatar } = req.body;
    const { user_id } = req.body;


    if (!avatar) {
        return res.status(400).json({
            status: 'fail',
            message: 'No avatar found',
        });
    }

    const response = await cloudinary.uploader.upload(avatar);

    const updatedUser = await pool.query('UPDATE Users SET avatar = $1 WHERE user_id = $2 RETURNING *', [response.secure_url, user_id]);

    res.status(200).json({
        status: 'success',
        message: 'Avatar updated successfully',
        data: {
            user: updatedUser.rows[0],
        },
    });
});


//update password
export const updatePassword = catchAsync(async (req, res, next) => {
    //console.log(req.body);
    const { currentPassword, newPassword } = req.body;
    const { user_id } = req.body;

    const result = await pool.query('SELECT user_pass FROM Users WHERE user_id = $1', [user_id]);
    const user_Pass = result.rows[0].user_pass;
    //console.log("Curr pass:", currentPassword);
    //console.log("New pass:", newPassword);
    if (!user_Pass || !(await bcrypt.compare(currentPassword, user_Pass))) {
        return res.status(400).json({
            status: 'fail',
            message: 'Incorrect password',
        });
    }

    const hashedPass = await bcrypt.hash(newPassword, 12);
    const passChangedAt = new Date();

    await pool.query('UPDATE Users SET user_pass = $1,pass_changedAt = $2 WHERE user_id = $3', [hashedPass, passChangedAt, user_id]);

    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully',

    });

});

//get users
export const getAllUsers = catchAsync(async (req, res, next) => {
    const { user_id } = req.body;

    const verified_users = await pool.query('SELECT user_id, user_name, user_status, avatar FROM Users WHERE verified = $1 AND user_id != $2', [true, user_id]);

    console.log(verified_users.rows);

    return res.status(200).json({
        status: 'success',
        message: 'Users found',
        data: {
            users: verified_users.rows,
        },
    })

});



//get messages
export const getMessages = catchAsync(async (req, res, next) => {
    const { user_id: user1_id } = req.params;
    const { user_id: user2_id } = req.body;

    try {
        const messages = await pool.query(
            `
                SELECT 
                    M.msg_id,
                    M.contents, 
                    M.audio_url, 
                    M.media_url,
                    M.msg_type,
                    M.created_at,
                    M.user_id AS sender_id,
                
                FROM Messages M
    
                JOIN Conversations C
    
                ON M.conversation_id = C.conversation_id
    
                WHERE 
                    (C.user1_id = $1 AND C.user2_id = $2)
    
                    OR
    
                    (C.user1_id = $2 AND C.user2_id = $1)
                
                ORDER BY M.created_at ASC;
            `, [user1_id, user2_id]
        );

        return res.status(200).json({
            status: 'success',
            message: 'Messages found',
            data: {
                messages: messages.rows,
            },
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: 'Failed to fetch messages',
        });
    }

});


//send messages
export const sendMessage = catchAsync(async (req, res, next) => {

});