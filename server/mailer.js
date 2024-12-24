import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import content from './otp.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendMail = async ({ name, otp, email }) => {
    const mailOptions = {
        to: email,
        subject: 'OTP for verification',
        html: content({ name, otp }),
    };

    try {
        const mail = await transporter.sendMail(mailOptions);
        console.log('Mail sent: %s', mail.messageId);
    }
    catch (error) {
        console.error('Error sending mail', error);
        throw new Error('Error sending mail');
    }

};