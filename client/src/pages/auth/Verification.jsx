import React from "react";

export default function Verification() {
    return (
        <div className="flex items-center justify-center min-h-screen  text-white">
            <div className="w-full max-w-md p-8 bg-boxdark rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-4">Verification</h2>
                <p className="text-gray-400 text-center mb-6">
                    Enter the verification code sent to your email
                </p>

                {/* Input Field */}
                <div className="mb-6">
                    <label htmlFor="code" className="block text-sm font-medium mb-2">
                        Verification Code
                    </label>
                    <input
                        id="code"
                        type="text"
                        placeholder="Enter code"
                        className="w-full px-4 py-2 text-strokedark rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition">
                    Verify
                </button>

                {/* Footer */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                        Didn't receive the code?{" "}
                        <button className="text-blue-500 hover:underline">
                            Resend Code
                        </button>
                    </p>
                </div>
                <span className='mt-5 block text-red text-center'>
                    Don't share this code with anyone
                </span>
            </div>
        </div>
    );
}
