import React, { useState } from 'react'
import User01 from '../images/user-01.png';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('profile') // Toggle between Profile and Update Password
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        bio: '',
        country: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    return (
        <div className='w-full rounded-sm border border-stroke bg-white py-7.5 px-20 shadow-default dark:border-strokedark dark:bg-boxdark'>

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
                                <label htmlFor='profile' className='absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2 p-2'>
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
                                    <input type='file' name='profile' id='profile' className='sr-only' />
                                </label>

                            </div>
                        </div>

                        {/* Profile Form */}
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-150">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg text-black dark:text-white border border-stroke dark:border-strokedark bg-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    placeholder="Add your bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2.5 rounded-lg text-black dark:text-white border border-stroke dark:border-strokedark bg-transparent focus:border-primary focus:ring-0 dark:focus:border-primary"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'password' && (
                    <form className="space-y-6 max-w-150">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2.5 text-black dark:text-white rounded-lg border border-stroke dark:border-strokedark bg-transparent focus:border-primary focus:ring-0 dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2.5 text-black dark:text-white rounded-lg border border-stroke dark:border-strokedark bg-transparent focus:border-primary focus:ring-0 dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2.5 text-black dark:text-white rounded-lg border border-stroke dark:border-strokedark bg-transparent focus:border-primary focus:ring-0 dark:focus:border-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Update Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
