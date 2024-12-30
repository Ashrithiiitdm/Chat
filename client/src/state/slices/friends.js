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

export function FetchFriends() {
    return async (dispatch, getState) => {
        await axios.get('/user/get-friends', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().auth.token}`,
            }
        }).then(function (response) {
            console.log("In Fetchfriends:", response.data.data.friends);
            dispatch(updateFriends({ friends: response.data.data.friends }));
        }).catch(function (error) {
            console.log(error);
            toast.error(error.response.message || 'Failed to fetch friends.');
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
            dispatch(updateFriendRequests({ friendRequests: response.data.friendRequests }));
        }).catch(function (error) {
            console.log(error);
        });
    };
};