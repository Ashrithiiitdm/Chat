import catchAsync from "../utils/catchAsync.js";
import pool from "../db/db.js";

export const getFriends = catchAsync(async (req, res, next) => {
    try{
        const { user_id } = req.body;
        console.log("User id in getFriends:", user_id);
        const friends = await pool.query(
            `
            SELECT DISTINCT
                U.user_id AS friend_id,
                U.user_name AS friend_name,
                U.avatar AS friend_avatar,
                U.bio AS friend_bio,
                U.email AS friend_email,
                U.user_status AS friend_status
            FROM Friends F
            JOIN Users U
                ON U.user_id = F.friend_id
            WHERE F.user_id = $1

            UNION

            SELECT DISTINCT
                U.user_id AS friend_id,
                U.user_name AS friend_name,
                U.avatar AS friend_avatar,
                U.bio AS friend_bio,
                U.email AS friend_email,
                U.user_status AS friend_status
            FROM friends F
            JOIN users U
                ON U.user_id = F.user_id
            WHERE F.friend_id = $1;

        `, [user_id]
        );
        console.log("Friends:", friends);
        if (friends.rows.length === 0) {
            console.log("No friends found");
            return res.status(200).json({
                status: 'success',
                message: 'No friends found',
            });
        }

        else {
            console.log("Friends:", friends.rows);
            return res.status(200).json({
                status: 'success',
                message: 'Friends found',
                data: {
                    friends: friends.rows
                }
            });
        }
    }
    catch(err){
        console.log("Error in getFriends:", err); 
        return res.status(400).json({
            status: 'fail',
            message: 'Error in getting friends',
        });
    }

});

export const getFriendRequests = catchAsync(async (req, res, next) => {

    const { user_id } = req.body;
    //console.log("User id in getFriends:", user_id);
    const friendRequests = await pool.query(
        `
            SELECT 
                U.user_id AS requester_id,
                U.user_name AS requester_name,
                U.avatar AS requester_avatar,
                U.bio AS requester_bio,
                U.email AS requester_email,
                U.user_status AS requester_status
            FROM friend_requests F
            JOIN users U
                ON U.user_id = F.sender_id
            WHERE F.receiver_id = $1;

        `, [user_id]
    );

    if (friendRequests.rows.length === 0) {

        return res.status(200).json({
            status: 'success',
            message: 'No friend requests found',
        });
    }

    else {
        return res.status(200).json({
            status: 'success',
            message: 'Friend requests found',
            data: {
                friendRequests: friendRequests.rows
            }
        });
    }

});


export const addFriend = catchAsync(async (req, res, next) => {

    const { user_id, friend_id } = req.body;

    try {
        const newFriend = await pool.query(
            `
                INSERT INTO friends (user_id, friend_id) 
                VALUES ($1, $2) RETURNING *
            `, [user_id, friend_id]
        );

        await pool.query(
            `
                DELETE FROM friend_requests
                WHERE sender_id = $1 AND receiver_id = $2
            `   , [friend_id, user_id]
        )

        return res.status(200).json({
            status: 'success',
            message: 'Friend added',
            data: {
                friends: newFriend.rows,
            }
        });

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            status: 'fail',
            message: 'Error adding friend',
        });
    }

});


export const addFriendRequest = catchAsync(async (req, res, next) => {

    const { sender_id, receiver_id } = req.body;

    try {

        const existingFriendRequest = await pool.query(
            `
                SELECT * FROM friend_requests
                WHERE sender_id = $1 AND receiver_id = $2
            `, [sender_id, receiver_id]
        );

        if (existingFriendRequest.rows.length > 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Friend request already exists',
            });
        }

        const existingFriend = await pool.query(
            `
                SELECT DISTINCT * 
                FROM friends
                WHERE user_id = $1 AND friend_id = $2

                UNION

                SELECT DISTINCT *
                FROM friends
                WHERE user_id = $2 AND friend_id = $1
            `, [sender_id, receiver_id]
        );


        if (existingFriend.rows.length > 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Friend request cannot be added, already friends',
            });
        }


        const newFriendRequests = await pool.query(
            `
                INSERT INTO friend_requests (sender_id, receiver_id)
                VALUES ($1, $2) RETURNING *
            `, [sender_id, receiver_id]
        )

        return res.status(200).json({
            status: 'success',
            message: 'Friend request sent',
            data: {
                friendRequests: newFriendRequests.rows,
            }
        });

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            status: 'fail',
            message: 'Error in sending friend request',
        });
    }

});