import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../axios';


const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
};


const slice = createSlice({
    name: 'chats',
    initialState,

    reducers: {
        updateUsers(state, action) {
            state.users = action.payload.users;
        },

        updateMessages(state, action) {
            state.messages = action.payload.messages;
        },

        setUserLoading(state, action) {
            state.isUserLoading = action.payload;
        },

        setMessagesLoading(state, action) {
            state.isMessagesLoading = action.payload;
        },

        setSelectedUser(state, action) {
            state.selectedUser = action.payload.user;
        }

    },

});


export default slice.reducer;


const { updateUsers, updateMessages, setUserLoading, setMessagesLoading, setSelectedUser } = slice.actions;

export function FetchUsers() {
    return async (dispatch, getState) => {

        setUserLoading(true);

        await axios.get('/user/users', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then(function (response) {
            console.log(response.data);
            dispatch(updateUsers({ users: response.data.data.users }));

        }).catch((err) => {
            console.log(err);
            toast.error(err.response.message || 'Failed to fetch users.');

        }).finally(() => {
            setUserLoading(false);
        });

    }
};

export function FetchMessages(user_id) {
    return async (dispatch, getState) => {

        setMessagesLoading(true);

        await axios.get(`/messages/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then(function (response) {
            console.log(response.data);
            dispatch(updateMessages({ messages: response.data.data.messages }));

        }).catch((err) => {
            console.log(err);
            toast.error(err.response.message || 'Failed to fetch messages.');

        }).finally(() => {
            setMessagesLoading(false);
        });

    };

};


export function SendMessage(msgData) {
    return async (dispatch, getState) => {
        const { selectedUser, messages } = getState().chats;

        await axios.get(`/messages/${selectedUser.user_id}`, msgData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }).then(function (response) {
            console.log(response.data);
            dispatch(updateMessages({ messages: [...messages, response.data.data.message] }));
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message || 'Failed to send message.');
        }).finally(() => {
            setMessagesLoading(false);
        });


    };
};

