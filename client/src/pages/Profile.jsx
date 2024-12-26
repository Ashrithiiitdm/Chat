import React, { useState, useEffect } from 'react';
import User01 from '../images/user-01.png';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { FetchUserProfile, UpdateProfile, UpdatePassword } from '../state/slices/profile';
import { toast } from 'react-toastify';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { current } from '@reduxjs/toolkit';

// Validation schemas
const profileSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    bio: yup.string().trim().required('Bio is required'),
});

const passwordSchema = yup.object().shape({
    currentPassword: yup.string().trim().required('Current password is required'),
    newPassword: yup
        .string()
        .required('New Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export default function Profile() {
    const [activeTab, setActiveTab] = useState('profile'); // Toggle between Profile and Update Password
    const [passwordVisible, setPasswordVisible] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    // Function to toggle password visibility
    const togglePasswordVisibility = (field) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    // Profile form
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: '',
            bio: '',
        },
    });

    // Password form
    const {
        control: passwordControl,
        handleSubmit: handleSubmitPassword,
        reset: resetPasswordFields,
        formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    } = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    // Fetch user profile on component mount
    useEffect(() => {
        dispatch(FetchUserProfile());
    }, [dispatch]);

    // Update form fields when user data changes
    useEffect(() => {
        if (user) {
            reset({
                name: user.user_name || '',
                bio: user.bio || '',
            });
        }
    }, [user, reset]);

    // Handle profile form submission
    const onSubmit = async (data) => {
        try {
            dispatch(UpdateProfile({ name: data.name, bio: data.bio }));
            toast.success('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while updating the profile.');
        }
    };

    // Handle password form submission
    const onSubmitPassword = async (data) => {
        try {
            const { currentPassword, newPassword } = data;
            dispatch(UpdatePassword({ currentPassword, newPassword }));
            toast.success('Password updated successfully!');

            // Reset the password fields after successful submission
            resetPasswordFields({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (err) {
            console.log(err);
            toast.error('An error occurred while updating the password.');
        }
    };

    return (
        <div className="w-full rounded-sm border border-stroke bg-white py-7.5 px-20 shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-stroke dark:border-strokedark pb-4">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`text-lg font-medium pb-2 ${activeTab === 'profile'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-bodydark hover:text-primary dark:text-bodydark2 dark:hover:text-primary'
                        }`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`text-lg font-medium pb-2 ${activeTab === 'password'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-bodydark hover:text-primary dark:text-bodydark2 dark:hover:text-primary'
                        }`}
                >
                    Update Password
                </button>
            </div>

            {/* Content */}
            <div className="mt-6">
                {activeTab === 'profile' && (
                    <div>
                        {/* Profile Picture */}
                        <div className="flex mb-8">
                            <div className="relative">
                                <img
                                    src={User01}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                                <label
                                    htmlFor="profile"
                                    className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2 p-2"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                    <input
                                        type="file"
                                        name="profile"
                                        id="profile"
                                        className="sr-only"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) toast.info('Profile picture updated successfully!');
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-150">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-2.5 rounded-lg text-black dark:text-white border border-stroke dark:border-strokedark bg-transparent"
                                        />
                                    )}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Bio</label>
                                <Controller
                                    name="bio"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            placeholder="Add your bio"
                                            rows="4"
                                            className="w-full px-4 py-2.5 rounded-lg text-black dark:text-white border border-stroke dark:border-strokedark bg-transparent focus:border-primary focus:ring-0 dark:focus:border-primary"
                                        />
                                    )}
                                />
                                {errors.bio && (
                                    <p className="text-red-500 text-sm">{errors.bio.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`w-full py-2.5 rounded-lg transition-colors ${isSubmitting
                                    ? 'bg-gray-400 text-white'
                                    : 'bg-primary text-white hover:bg-primary/90'
                                    }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                )}
                {activeTab === 'password' && (
                    <form className="space-y-6 max-w-150" onSubmit={handleSubmitPassword(onSubmitPassword)}>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Current Password
                            </label>
                            <div className='relative'>
                                <Controller
                                    name="currentPassword"
                                    control={passwordControl}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type={passwordVisible.currentPassword ? 'text' : 'password'}
                                            className="w-full px-4 py-2.5 text-black dark:text-white rounded-lg border border-stroke dark:border-strokedark bg-transparent focus:border-primary focus:ring-0 dark:focus:border-primary"
                                        />
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('currentPassword')}
                                    className="absolute right-3 top-3"
                                >
                                    {passwordVisible.currentPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {passwordErrors.currentPassword && (
                                <p className="text-red-500 text-sm">{passwordErrors.currentPassword.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Controller
                                    name="newPassword"
                                    control={passwordControl}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type={passwordVisible.newPassword ? 'text' : 'password'}
                                            className="w-full px-4 py-2.5 text-black dark:text-white rounded-lg border border-stroke dark:border-strokedark bg-transparent focus:border-primary focus:ring-0 dark:focus:border-primary"
                                        />
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('newPassword')}
                                    className="absolute right-3 top-3"
                                >
                                    {passwordVisible.newPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {passwordErrors.newPassword && (
                                <p className="text-red-500 text-sm">{passwordErrors.newPassword.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Controller
                                    name="confirmPassword"
                                    control={passwordControl}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type={passwordVisible.confirmPassword ? 'text' : 'password'}
                                            className="w-full px-4 py-2.5 text-black dark:text-white rounded-lg border border-stroke dark:border-strokedark bg-transparent focus:border-primary focus:ring-0 dark:focus:border-primary"
                                        />
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                    className="absolute right-3 top-3"
                                >
                                    {passwordVisible.confirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {passwordErrors.confirmPassword && (
                                <p className="text-red-500 text-sm">{passwordErrors.confirmPassword.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2.5 rounded-lg transition-colors ${isPasswordSubmitting
                                ? 'bg-gray-400 text-white'
                                : 'bg-primary text-white hover:bg-primary/90'
                                }`}
                            disabled={isPasswordSubmitting}
                        >
                            {isPasswordSubmitting ? 'Submitting...' : 'Update Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
