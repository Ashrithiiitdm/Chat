import express from 'express';
import * as userController from '../controllers/users.js';
import * as authController from '../controllers/authUsers.js';
import * as friendsController from '../controllers/friends.js';

const router = express.Router();
router.use(authController.auth);


router.get('/profile', userController.getUser);
router.put('/profile', userController.updateUser);
router.patch('/avatar', userController.updateAvatar);
router.patch('/update-password', userController.updatePassword);


router.get('/users', userController.getAllUsers);
router.get('/get-friends', friendsController.getFriends);
router.get('/friend-requests', friendsController.getFriendRequests);
router.post('/add-friend', friendsController.addFriend);
router.post('/add-friend-request', friendsController.addFriendRequest);


router.get('/messages/:user_id', userController.getMessages);
router.post('/messages/:user_id', userController.sendMessage);


export default router;
