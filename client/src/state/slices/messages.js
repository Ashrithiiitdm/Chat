import { createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    conversations: [],
    currentChat: null,
    messages: [],
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setConversations(state, action) {
            state.conversations = action.payload;
        },
        setCurrentChat(state, action) {
            state.currentChat = action.payload;
        },
        setMessages(state, action) {
            state.messages = action.payload;
        },
        addMessage(state, action) {
            state.messages.push(action.payload);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export default slice.reducer;

// Actions
export const sendMessage = (receiverId, message, type = 'text') => async (dispatch, getState) => {
    try {
        const { socket } = getState().auth;
        const { user_id } = getState().auth;

        const messageData = {
            sender_id: user_id,
            receiver_id: receiverId,
            content: message,
            type: type,
            created_at: new Date(),
        };

        // Send to socket server
        socket.emit('sendMessage', messageData);

        // Save to database
        const response = await axios.post(`/user/messages/${receiverId}`, messageData, {
            headers: {
                Authorization: `Bearer ${getState().auth.token}`,
            },
        });

        dispatch(slice.actions.addMessage(response.data.message));
    } catch (error) {
        console.error('Error sending message:', error);
        dispatch(slice.actions.setError('Failed to send message'));
    }
};

export const fetchMessages = (userId) => async (dispatch, getState) => {
    try {
        dispatch(slice.actions.setLoading(true));
        const response = await axios.get(`/user/messages/${userId}`, {
            headers: {
                Authorization: `Bearer ${getState().auth.token}`,
            },
        });
        dispatch(slice.actions.setMessages(response.data.messages));
    } catch (error) {
        console.error('Error fetching messages:', error);
        dispatch(slice.actions.setError('Failed to fetch messages'));
    } finally {
        dispatch(slice.actions.setLoading(false));
    }
}; 