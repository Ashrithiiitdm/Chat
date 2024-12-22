import express from 'express';
import * as authUser from "../controllers/authUsers.js";

const router = express.Router();


router.post('/signup', authUser.regUser, authUser.sendOtp);
router.post('/resend-otp', authUser.resendOtp);
router.post('/verify', authUser.verifyOtp);
router.post('/login', authUser.loginUser);

export default router;