import express from 'express';
import * as userController from '../controllers/users.js';
import * as authController from '../controllers/authUsers.js';

const router = express.Router();
router.use(authController.auth);


router.get('/profile', userController.getUser);
router.post('/profile', userController.updateUser);
router.patch('/avatar', userController.updateAvatar);
router.patch('/update-password', userController.updatePassword);


router.get('/users', userController.getAllUsers);

router.post('/startChat', userController.startConversation);

router.get('/chats', userController.getConversations);

export default router;
