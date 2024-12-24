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
    };
};