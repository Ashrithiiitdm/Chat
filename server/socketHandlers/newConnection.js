import pool from '../server.js';

export const newConnection = async (socket, io) => {
    const { user_id } = socket.user;

    console.log(`New connection: ${socket.id}`);

    const user = await pool.query('UPDATE Users SET user_status = $1, socket_id = $2 WHERE user_id = $3 RETURNING *', ['Online', socket.id, user_id]).rows[0];

    if (user) {
        //Inform everyone that the user is online
        socket.broadcast.emit('user-connected', {
            message: `${user.user_name} is online`,
            user_id: user.user_id,
            status: 'Online',
        });
    }
    else {
        console.log(`User with id ${user_id} not found`);
    }


};