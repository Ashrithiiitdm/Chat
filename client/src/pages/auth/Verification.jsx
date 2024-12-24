import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { VerifyOtp, ResendOtp } from "../../state/slices/auth";


const schema = yup.object().shape({
    otp: yup
        .string()
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
        .required("OTP is required"),
});


export default function Verification() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            otp: '',
        },
    });


    const email = new URLSearchParams(location.search).get('email');

    const onSubmit = (data) => {
        try {
            dispatch(VerifyOtp({ email: email, otp: data.otp }, navigate));
        }

        catch (err) {
            console.log(err, 'Verification failed');
        }

    };

    const handleResendOtp = async () => {
        try {
            dispatch(ResendOtp(email));
            console.log("OTP resent successfully");
        }
        catch (err) {
            console.log(err, 'Resend OTP failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md p-8 bg-boxdark rounded-lg shadow-md"
            >
                <h2 className="text-3xl font-bold text-center mb-4">Verification</h2>
                <p className="text-gray-400 text-center mb-6">
                    Enter the verification code sent to your email
                </p>

                {/* OTP Input Field */}
                <div className="mb-6">
                    <label htmlFor="otp" className="block text-sm font-medium mb-2">
                        Verification Code
                    </label>
                    <input
                        {...register("otp")}
                        id="otp"
                        type="text"
                        maxLength="6"
                        placeholder="Enter 6-digit code"
                        className={`w-full px-4 py-2 text-black text-center text-lg rounded-md border ${errors.otp
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-600 focus:ring-blue-500"
                            } focus:outline-none focus:ring-2`}
                    />
                    {errors.otp && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.otp.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition"
                >
                    Verify
                </button>

                {/* Footer */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                        Didn't receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            className="text-blue-500 hover:underline"
                        >
                            Resend Code
                        </button>
                    </p>
                </div>
                <span className="mt-5 block text-red text-center">
                    Don't share this code with anyone
                </span>
            </form>
        </div>
    );
}
