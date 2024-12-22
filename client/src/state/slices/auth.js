import { createSlice } from "@reduxjs/toolkit"
import axios from "../../axios";
import { toast } from 'react-toastify';

const initialState = {
    isLoading: false,
    error: null,
    token: null,
    user: {},
    isLogged: false,
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
        },

        logOutSuccess(state, action) {
            state.token = null;
            state.isLogged = false;
        },

    }
});

export default slice.reducer;

const { setError, setLoading, loginSucess, logOutSuccess } = slice.actions;

export function RegisterUser(formData) {
    return async (dispatch, getState) => {
        dispatch(setError(null));
        dispatch(setLoading(true));

        const reqBody = {
            ...formData,
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
        });

    };
};

export function ResendOtp() {
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


export function VerifyOtp(formValues, navigate) {

    return async (dispatch, getState) => {

        dispatch(setError(null));
        dispatch(setLoading(true));

        await axios.post('/auth/verify', {
            ...formValues,
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
            toast.error(err.response.data?.message || 'Something went wrong');
        }).finally(() => {
            dispatch(setLoading(false));
            if (!getState().auth.error) {
                navigate('/dashboard');
            }
        });

    };

};



export function LoginUser(formValues, navigate) {

    return async (dispatch, getState) => {

        dispatch(setError(null));
        dispatch(setLoading(true));

        await axios.post('/auth/login', {
            ...formValues,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            console.log(response.data);

            const { token, message } = response.data;

            dispatch(loginSucess(token));


            toast.success(message || 'Logged in successfully');
        }).catch(function (error) {
            console.log('Error is ', error.response.data);
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