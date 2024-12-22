import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../state/slices/auth";
import 'react-toastify/dist/ReactToastify.css';



//Checking valid data
const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {

            email: '',
            password: '',

        },

    });


    const onSubmit = async (data) => {
        console.log(data, 'form data for login');
        dispatch(LoginUser(data, navigate));
    };

    return (
        <div className="flex items-center justify-center h-screen bg-stroke">
            {/* Login Card */}
            <div className="bg-boxdark rounded-lg shadow-md p-8 sm:w-[400px] w-full">
                {/* Header */}
                <h2 className="text-center text-title-lg font-semibold text-white mb-2">
                    Sign in
                </h2>
                <p className="text-center text-bodydark mb-6">
                    Welcome, please sign in to continue
                </p>

                {/* Social Login */}
                <div className="space-y-4">
                    <button
                        onClick={() => { navigate("/dashboard"); }
                        }
                        className="w-full flex items-center justify-center gap-2 border border-stroke rounded-md py-2 hover:bg-stroke transition">
                        <span className="mr-2 text-xl text-red-500">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_191_13499)">
                                    <path
                                        d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                                        fill="#EB4335"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_191_13499">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span> Sign In With
                        Google
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="w-full h-[1px] bg-stroke"></div>
                    <span className="px-2 text-sm text-bodydark">or</span>
                    <div className="w-full h-[1px] bg-stroke"></div>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-bodydark text-sm mb-1"
                        >
                            Email *
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            id="email"
                            className={`w-full p-2 bg-stroke text-boxdark-2 rounded-md focus:ring-2 focus:ring-gray-2 ${errors.email ? 'border-red focus:border-red' : 'border-stroke'}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className='text-red text-sm'>
                            {errors.email.message}
                        </p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-bodydark text-sm mb-1"
                        >
                            Password *
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            id="password"
                            className={`w-full p-2 bg-stroke text-boxdark-2 rounded-md focus:ring-2 focus:ring-gray-2 ${errors.password ? 'border-red focus:border-red' : 'border-stroke'}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className='text-red text-sm'>
                            {errors.password.message}
                        </p>}
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 text-stroke bg-stroke border-none rounded"
                        />
                        <label htmlFor="remember" className="ml-2 text-bodydark text-sm">
                            Remember me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 border border-primary bg-primary text-white rounded-md py-2 hover:bg-opacity-90 transition"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center text-bodydark mt-6">
                    Don't have an account?{" "}
                    <Link to="/auth/signup" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
