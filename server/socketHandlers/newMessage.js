import pool from "../server.js";

export const newMessage = async (socket, data, io) => {
    console.log(data, 'new message');
    const { conversation_id, message } = data;

    const { user_id, contents, media, audio_url, document, msg_type } = message;

    try {
        const messages = await pool.query('SELECT * FROM Conversations WHERE id = $1', [conversation_id]).rows[0];

        if (!messages) {
            return socket.emit('error', { message: 'Conversation not found' });
        }

        const newMessage = await pool.query(`
            INSERT INTO Messages (user_id, conversation_id, contents, audio_url, msg_type, doc_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
            , [user_id, conversation_id, contents, audio_url, msg_type, document.doc_id]
        );

        const newMedia = await pool.query(`
            INSERT INTO Mediad (msg_id, media_type, media_url)
            VALUES ($1, $2, $3);`
            , [user_id, media.media_type, media.media_url]
        );

        const query = `
                SELECT 
                    c.conversation_id,
                    c.created_at AS conversation_created_at,
                    json_agg(
                        json_build_object(
                            'user_id', cp.user_id,
                            'user_name', u.user_name,
                            'joined_at', cp.joined_at,
                            'status', u.user_status,
                            'socket_id', u.socket_id
                        )
                    ) AS participants,
                    json_agg(
                        json_build_object(
                            'msg_id', m.msg_id,
                            'contents', m.contents,
                            'audio_url', m.audio_url,
                            'msg_type', m.msg_type,
                            'doc_id', m.doc_id,
                            'created_at', m.created_at
                        )
                    ) AS messages
                FROM 
                    Conversations c
                LEFT JOIN 
                    Conversation_Participants cp ON c.conversation_id = cp.conversation_id
                LEFT JOIN 
                    Users u ON cp.user_id = u.user_id
                LEFT JOIN 
                    Messages m ON c.conversation_id = m.conversation_id
                WHERE 
                    c.conversation_id = $1
                GROUP BY 
                    c.conversation_id;
            `;

        const updatedConversation = await pool.query(query, [conversation_id]).rows[0];
        const onlineParticipants = updatedConversation.participants.filter(
            (participant) => participant.socket_id && participant.status === 'Online'
        );

        console.log(onlineParticipants, 'online participants');

        onlineParticipants.forEach((participant) => {
            console.log(participant.socket_id, 'socket id');

            io.to(participant.socket_id).emit('newMessage', {
                conversation_id: updatedConversation.conversation_id,
                messages: updatedConversation.messages,
            });
        });

    }
    catch (err) {
        console.log('Error handling new message', err);

        socket.emit('error', { message: 'Failed to send message', err });
    }

}