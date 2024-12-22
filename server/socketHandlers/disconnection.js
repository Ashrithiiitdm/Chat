import pool from "../server.js";

export const disconnectHandler = async (socket) => {
    console.log(`User disconnected: ${socket.id}`);
    const { user_id } = socket.user;

    const user = await pool.query('UPDATE Users SET user_status = $1, socket_id = $2 WHERE user_id = $3', ['Offline', NULL, user_id]).rows[0];

    if (user) {
        //Inform everyone that the user is offline
        socket.broadcast.emit('user-disconnected', {
            message: `${user.user_name} is offline`,
            user_id: user.user_id,
            status: 'Offline',
        });
    }

    else {
        console.log(`User with id ${user_id} not found`);
    }

};