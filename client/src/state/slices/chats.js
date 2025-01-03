import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    users: [],               // List of all users
    selectedUser: null,      // Currently selected user for chat
    messages: [],            // Messages for the selected user
    isMessagesLoading: false, // Loading state for messages
};

// Redux slice
const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        updateUsers(state, action) {
            state.users = action.payload.users;
        },
        selectUser(state, action) {
            if (state.selectedUser?.user_id === action.payload.user.user_id) return;
            state.selectedUser = action.payload.user;
            //console.log(state.selectedUser);
            state.messages = []; // Reset messages when a new user is selected
            state.isMessagesLoading = true; // Set loading state for fetching messages
        },
        updateMessages(state, action) {
            state.messages = action.payload.messages;
        },
        setMessagesLoading(state, action) {
            state.isMessagesLoading = action.payload;
        },
    },
});

export const { updateUsers, selectUser, updateMessages, setMessagesLoading } = chatsSlice.actions;

// Async thunk to fetch messages for a selected user
export function FetchMessages() {
    return async (dispatch, getState) => {
        dispatch(setMessagesLoading(true)); // Start loading

        const { user_id } = getState().chats.selectedUser;

        console.log("In fetchmesssages", user_id);

        try {
            const response = await axios.get(`/user/messages/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            });


            dispatch(
                updateMessages({
                    messages: response.data.messages,
                })
            );
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Failed to fetch messages.');
        } finally {
            dispatch(setMessagesLoading(false)); // Stop loading
        }
    };
}


// Async thunk to send a new message
export function SendMessage(msgData) {
    return async (dispatch, getState) => {
        const { selectedUser, messages } = getState().chats;

        try {
            const response = await axios.post(
                `user/messages/${selectedUser.user_id}`,
                msgData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getState().auth.token}`,
                    },
                }
            );
            dispatch(
                updateMessages({
                    messages: [...messages, response.data.data.message],
                })
            );
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send message.');
        }
    };
}

// Export the reducer
export default chatsSlice.reducer;
