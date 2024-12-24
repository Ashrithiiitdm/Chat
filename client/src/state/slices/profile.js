import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../axios.js';

const initialState = {
    user: {},
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

        fetchUser(state, action) {
            state.user = action.payload.user;
        },

        updateUser(state, action) {
            state.user = action.payload.user;
        },

        setUser(state, action) {
            state.user = action.payload;
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

const { setUser, setLoading, setError } = slice.actions;


export function FetchUserProfile() {
    return async (dispatch, getState) => {
        axios.get("/user/profile", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        })
            .then((response) => {
                //console.log(response.data.user);
                dispatch(slice.actions.fetchUser({ user: response.data.user }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export function UpdateProfile(formValues) {

    return async (dispatch, getState) => {

        const reqBody = {
            name: formValues.name,
            bio: formValues.bio,
        };

        axios.post("/user/profile", reqBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            }
        ).then((response) => {
            //console.log(response);
            dispatch(slice.actions.updateUser({ user: response.data.data }));
        }).catch((err) => {
            console.log(err);
            const errorMessage =
                err.response?.data?.message || 'An error occurred while updating the profile.';
            dispatch(setError(errorMessage));
        });
    };
};



export function UpdatePassword(passwordData) {

    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const reqBody = {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
        };

        try {
            const response = await axios.patch('/user/update-password', reqBody, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            });

            toast.success(response?.data.message || 'Password updated successfully.');

        }
        catch (err) {
            const errorMessage = err.response?.data?.message || 'An error occurred while updating the password.';
            dispatch(setError(errorMessage));
            console.log(err);
        }
        finally {
            dispatch(setLoading(false));
        }

    };

}