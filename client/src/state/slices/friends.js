import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    users: [],
    friends: [],
    friendRequests: [],
    loading: false,
    error: null,
};

const slice = createSlice({

    name: 'friends',
    initialState,

    reducers: {
        updateFriends(state, action) {
            state.friends = action.payload.friends;
        },

        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.friendRequests;
        },

        updateUsers(state, action) {
            state.users = action.payload.users;
        },

        setError(state, action) {
            state.error = action.payload;
        },
    },
});

const { updateFriends, updateFriendRequests, updateUsers, setError } = slice.actions;

export default slice.reducer;

export function FetchUsers() {
    return async (dispatch, getState) => {
        await axios.get('/user/users', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }).then(function (response) {
            console.log(response.data.users);
            dispatch(updateUsers({ users: response.data.users }));
        }).catch((err) => {
            console.log(err);
            setError(err.response.data.message || 'An error occurred');
            toast.error(err.response.data.message || 'An error occurred');
        })
    };
};

export function FetchFriends() {
    return async (dispatch, getState) => {
        await axios.get('/user/get-friends', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then(function (response) {
            console.log(response.data.friends);
            dispatch(updateFriends({ friends: response.data.friends }));
        }).catch((err) => {
            console.log(err);
            setError(err.response.data.message || 'An error occurred');
            toast.error(err.response.data.message || 'An error occurred');
        });
    };
};

export function FetchFriendRequests() {
    return async (dispatch, getState) => {
        await axios.get('/user/friend-requests', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }).then(function (response) {
            console.log(response.data.friendRequests);
            dispatch(updateFriendRequests({ friendRequests: response.data.friendRequests }));
        }).catch((err) => {
            console.log(err);
            setError(err.response.data.message || 'An error occurred');
            toast.error(err.response.data.message || 'An error occurred');
        });
    };
};

