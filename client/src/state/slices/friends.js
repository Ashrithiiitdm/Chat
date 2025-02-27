import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../axios.js";


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
            console.log(response.data);
            dispatch(updateUsers({ users: response.data.data.users }));
        }).catch((err) => {
            console.log("Error:", err);
            setError(err);
            toast.error(err.response.message || 'Failed to fetch users.');
        });
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
            console.log(response.data);
            console.log("In Fetchfriends:", response.data.data.friends);
            dispatch(updateFriends({ friends: response.data.data.friends }));
        }).catch(function (error) {
            console.log("In fetchfreidns", error);
            setError(error);
            toast.error(error || 'Failed to fetch friends.');
        });
    };
}

export function FetchFriendRequests() {
    return async (dispatch, getState) => {
        await axios.get('/user/friend-requests', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then(function (response) {
            dispatch(updateFriendRequests({ friendRequests: response.data.data.friendRequests }));
        }).catch(function (error) {
            console.log(error);
            setError(error);
        });
    };
};