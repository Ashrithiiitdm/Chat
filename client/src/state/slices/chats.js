import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    users: [],
    selectedUser: null,
    messages: [],
    isMessagesLoading: false,
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        updateUsers(state, action) {
            state.users = action.payload.users;
        },
        selectUser(state, action) {
            state.selectedUser = action.payload.user;
            state.messages = []; // Reset messages when a new user is selected
        },
        updateMessages(state, action) {
            state.messages = [...state.messages, ...action.payload.messages];
        },
        setMessagesLoading(state, action) {
            state.isMessagesLoading = action.payload;
        },
    },
});

export const { updateUsers, selectUser, updateMessages, setMessagesLoading } = chatsSlice.actions;


export function FetchUsers() {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get('/user/users', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            });
            dispatch(updateUsers({ users: response.data.data.users }));
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch users.');
        }
    };
}

export function FetchMessages(user_id, page = 1) {
    return async (dispatch, getState) => {
        dispatch(setMessagesLoading(true));

        try {
            const response = await axios.get(`/messages/${user_id}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            });
            dispatch(
                updateMessages({
                    messages: response.data.data.messages,
                })
            );
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch messages.');
        } finally {
            dispatch(setMessagesLoading(false));
        }
    };
}

export function SendMessage(msgData) {
    return async (dispatch, getState) => {
        const { selectedUser, messages } = getState().chats;

        try {
            const response = await axios.post(
                `/messages/${selectedUser.user_id}`,
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

export default chatsSlice.reducer;
