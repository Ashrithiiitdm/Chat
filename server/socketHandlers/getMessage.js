import pool from "../server.js";

export const getMessages = async (socket, data) => {

    try {
        const { conversation_id } = data;

        console.log(data, 'conversation_id');

        const query = `
        SELECT c.id AS conversation_id, json_agg(m) AS Messages
        FROM conversations c
        LEFT JOIN messages m ON c.id = m.conversation_id
        WHERE c.id = $1
        GROUP BY c.id;
        `;

        const messages = await pool.query(query, [conversation_id]).rows[0];

        if (!messages) {
            return socket.emit("error", { message: "Conversation not found" });
        }

        const res_data = {
            conversation_id: messages.conversation_id,
            history: messages.messages
        };

        socket.emit('chatHistory', res_data);

    }
    catch (err) {
        socket.emit('error', { message: 'Failed to fetch chat history', err });
    }

};