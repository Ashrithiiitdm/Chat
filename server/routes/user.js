import express from 'express';
import * as userController from '../controllers/users.js';
import * as authController from '../controllers/authUsers.js';
import * as friendsController from '../controllers/friends.js';

const router = express.Router();
router.use(authController.auth);


router.get('/profile', userController.getUser);
router.post('/profile', userController.updateUser);
router.patch('/avatar', userController.updateAvatar);
router.patch('/update-password', userController.updatePassword);


router.get('/users', userController.getAllUsers);
router.get('/get-friends', friendsController.getFriends);
router.get('/friend-requests', friendsController.getFriendRequests);
router.post('/add-friend', friendsController.addFriend);
router.post('/add-friend-request', friendsController.addFriendRequest);

router.post('/startChat', userController.startConversation);

router.get('/chats', userController.getConversations);

export default router;
