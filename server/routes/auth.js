import express from 'express';
import authUser from "../controllers/authUsers.js";

const router = express.Router();


router.post('/signup', authUser.regUser, authUser.sendOtp);
router.post('/resendOtp', authUser.resendOtp);
router.post('/verify', authUser.verifyOtp);
router.post('/login', authUser.login);
