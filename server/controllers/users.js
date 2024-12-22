import catchAsync from "../utils/catchAsync.js";
import pool from "../server.js";
import bcrypt from "bcrypt";

export const getUser = catchAsync(async (req, res, next) => {

    const { user } = req;

    res.status(200).json({
        status: 'success',
        message: 'User found',
        data: {
            user,
        },
    });

});

//Update name and bio
export const updateUser = catchAsync(async (req, res, next) => {

    const { name, bio } = req.body;
    const { user_id } = req.user;

    const updatedUser = await pool.query('UPDATE Users SET name = $1, bio = $2 WHERE user_id = $3 RETURNING *', [name, bio, user_id]).rows[0];

    res.status(200).json({
        status: 'success',
        message: 'Profile updated successfully',
        data: {
            user: updatedUser,
        },
    });

});

//Update avatar
export const updateAvatar = catchAsync(async (req, res, next) => {

    const { avatar } = req.body;
    const { user_id } = req.user;

    const updatedUser = await pool.query('UPDATE Users SET avatar = $1 WHERE user_id = $2 RETURNING *', [avatar, user_id]).rows[0];

    res.status(200).json({
        status: 'success',
        message: 'Avatar updated successfully',
        data: {
            user: updatedUser,
        },
    });
});


//update password
export const updatePassword = catchAsync(async (req, res, next) => {
    const { currPass, newPass } = req.body;
    const { user_id } = req.user;

    const user_Pass = await pool.query('SELECT user_pass FROM Users WHERE user_id = $1', [user_id]).rows[0].user_pass;

    if (!user_Pass || !(await bcrypt.compare(currPass, user_Pass))) {
        return res.status(400).json({
            status: 'fail',
            message: 'Incorrect password',
        });
    }

    const hashedPass = await bcrypt.hash(newPass, 12);
    const passChangedAt = Date.now();

    await pool.query('UPDATE Users SET user_pass = $1 AND pass_changedAt = $2 WHERE user_id = $3', [hashedPass, passChangedAt, user_id]);

    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully',

    });

});

//get users
export const getAllUsers = catchAsync(async (req, res, next) => {
    const { user_id } = req.user;

    const verified_users = await pool.query('SELECT user_id, user_name, user_status, avatar FROM Users WHERE verfied = $1 AND user_id != $2', [true, user_id]).rows;

    return res.status(200).json({
        status: 'success',
        message: 'Users found',
        data: {
            users: verified_users,
        },
    })

});


//conversation
export const startConversation = catchAsync(async (req, res, next) => {
    const { user_id } = req.user;
    const { receiver_id } = req.body;

    // Check if a conversation between the users already exists
    const existingConversationQuery = `
        SELECT c.conversation_id,
               json_agg(json_build_object('msg_id', m.msg_id, 'contents', m.contents, 'created_at', m.created_at)) AS messages,
               json_agg(json_build_object('user_id', u.user_id, 'user_name', u.user_name)) AS participants
        FROM Conversations c
        LEFT JOIN Messages m ON c.conversation_id = m.conversation_id
        JOIN Conversation_Participants cp ON c.conversation_id = cp.conversation_id
        JOIN Users u ON cp.user_id = u.user_id
        WHERE c.conversation_id IN (
            SELECT conversation_id
            FROM Conversation_Participants
            WHERE user_id = $1 OR user_id = $2
            GROUP BY conversation_id
            HAVING COUNT(*) = 2
        )
        GROUP BY c.conversation_id;
    `;

    const existingConversationResult = await pool.query(existingConversationQuery, [user_id, receiver_id]).rows[0];

    // If a conversation exists, return it
    if (existingConversationResult.rows.length > 0) {
        return res.status(200).json({
            status: "success",
            data: existingConversationResult,
        });
    }

    // If no conversation exists, create a new one
    const newConversationQuery = `
        INSERT INTO Conversations DEFAULT VALUES
        RETURNING conversation_id;
    `;
    const newConversationId = await pool.query(newConversationQuery).rows[0].conversation_id;

    // Add both users as participants to the new conversation
    const addParticipantsQuery = `
        INSERT INTO Conversation_Participants (conversation_id, user_id)
        VALUES ($1, $2), ($1, $3);
    `;
    await pool.query(addParticipantsQuery, [newConversationId, user_id, receiver_id]);

    // Fetch the newly created conversation with participants
    const newConversationFetchQuery = `
        SELECT c.conversation_id,
               json_agg(json_build_object('user_id', u.user_id, 'user_name', u.user_name)) AS participants,
               json_build_array() AS messages
        FROM Conversations c
        JOIN Conversation_Participants cp ON c.conversation_id = cp.conversation_id
        JOIN Users u ON cp.user_id = u.user_id
        WHERE c.conversation_id = $1
        GROUP BY c.conversation_id;
    `;
    const newConversationFetchResult = await pool.query(newConversationFetchQuery, [newConversationId]);

    // Return the newly created conversation
    return res.status(201).json({
        status: "success",
        data: newConversationFetchResult.rows[0],
    });
});


//get conversations
export const getConversations = catchAsync(async (req, res, next) => {
    const { user_id } = req.user;

    //Finding converstaions which user is a part of
    const conversationsQuery = `
        SELECT 
        c.conversation_id,
        (
            SELECT json_agg(
                json_build_object(
                    'user_id', u.user_id,
                    'user_name', u.user_name
                )
            )
            FROM Conversation_Participants cp2
            JOIN Users u ON cp2.user_id = u.user_id
            WHERE cp2.conversation_id = c.conversation_id
        ) AS participants,
        COALESCE(
            json_agg(
                json_build_object(
                    'msg_id', m.msg_id,
                    'contents', m.contents,
                    'created_at', m.created_at
                ) ORDER BY m.created_at ASC
            ) FILTER (WHERE m.msg_id IS NOT NULL),
            '[]'
        ) AS messages
        FROM Conversations c
        JOIN Conversation_Participants cp ON c.conversation_id = cp.conversation_id
        LEFT JOIN Messages m ON m.conversation_id = c.conversation_id
        WHERE cp.user_id = $1
        GROUP BY c.conversation_id
        ORDER BY (
            SELECT MAX(m.created_at) 
            FROM Messages m
            WHERE m.conversation_id = c.conversation_id
        ) DESC NULLS LAST;
    `;

    const conversations = await pool.query(conversationsQuery, [user_id]).rows;

    return res.status(200).json({
        status: "success",
        data: conversations,
    });


});