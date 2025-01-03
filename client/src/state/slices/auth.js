import { createSlice } from "@reduxjs/toolkit"
import axios from "../../axios";
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    user_id: null,
    isLogged: false,
    isUpdatingProfile: false,
    socket:null,

}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },

        setLoading(state, action) {
            state.isLoading = action.payload;
        },

        loginSucess(state, action) {
            state.token = action.payload;
            state.isLogged = true;
            state.user_id = action.payload.user_id;
        },

        logOutSuccess(state, action) {
            state.token = null;
            state.isLogged = false;
        },

        // setSocket(state, action) {
        //     state.socket = action.payload.socket;
        // },

        // setOnlineUsers(state, action) {
        //     state.onlineUsers = action.payload.onlineUsers;
        // },

    }
});

export default slice.reducer;

const { setError, setLoading, loginSucess, logOutSuccess } = slice.actions;

export function RegisterUser(formData, navigate) {
    return async (dispatch, getState) => {
        dispatch(setError(null));
        dispatch(setLoading(true));

        const reqBody = {

            name: formData.name,
            email: formData.email,
            password: formData.password,

        };

        await axios.post('/auth/signup', reqBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            console.log(response);
            toast.success(response.data.message);
        }).catch(function (err) {
            console.log(err);
            dispatch(setError(err));

            toast.error(err.response.data.message);
        }).finally(() => {
            dispatch(setLoading(false));

            if (!getState().auth.error) {
                navigate(`/auth/verify?email=${formData.email}`);
            }

        });

    };
};

export function ResendOtp(email) {
    return async (dispatch, getState) => {
        dispatch(setError(null));
        dispatch(setLoading(true));

        await axios.post('/auth/resend-otp', {
            email,

        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            console.log(response);
            toast.success(response.data.message);
        }).catch(function (err) {
            console.log(err);
            dispatch(setError(err));
            toast.error(err.response.data?.message || 'Something went wrong');
        }).finally(() => {
            dispatch(setLoading(false));
        });
    };
};


export function VerifyOtp(formData, navigate) {

    return async (dispatch, getState) => {

        dispatch(setError(null));
        dispatch(setLoading(true));

        await axios.post('/auth/verify-otp', {
            email: formData.email,
            otp: formData.otp,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            console.log(response);

            const { token, message } = response.data;

            dispatch(loginSucess(token));


            toast.success(message || 'OTP verified successfully');
        }).catch(function (err) {
            console.log(err);
            dispatch(setError(err));
            toast.error(err);
        }).finally(() => {
            dispatch(setLoading(false));
            if (!getState().auth.error) {
                navigate('/dashboard');
            }
        });

    };

};



export function LoginUser(formData, navigate) {

    return async (dispatch, getState) => {

        dispatch(setError(null));
        dispatch(setLoading(true));

        await axios.post('/auth/login', {
            email: formData.email,
            password: formData.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            console.log(response.data);

            const { token, message, user_id } = response.data;

            dispatch(loginSucess(token, user_id));
            //dispatch(connectSocket(user_id));

            toast.success(message || 'Logged in successfully');
        }).catch(function (error) {
            console.log('Error is ', error.response);
            dispatch(setError(error));
            toast.error(error.response.data.message || 'Something went wrong');
        }).finally(() => {
            dispatch(setLoading(false));
            if (!getState().auth.error) {
                navigate('/dashboard');
            }
        });

    };

};


export function LogOutUser(navigate) {
    return async (dispatch, getState) => {
        try {
            dispatch(logOutSuccess());
            navigate('/');
            toast.success('Logged out successfully');
        }
        catch (err) {
            console.log(err);
        }
        finally {
            dispatch(setLoading(false));
            //dispatch(disconnectSocket());
        }
    };
};

