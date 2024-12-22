import express from 'express';
import userController from '../controllers/user.js';
import authController from '../controllers/authUsers.js';

const router = express.Router();
router.use(authController.auth);


router.get('/me', userController.getUser);
router.patch('/me', userController.updateUser);
router.patch('/avatar', userController.updateAvatar);
router.patch('/password', userController.updatePassword);


router.get('/users', userController.getAllUsers);

router.post('/startChat', userController.startConversation);

router.get('/chats', userController.getConversations);

export default router;
