import React, { useState, useEffect } from "react";
import { ChatTeardrop } from '@phosphor-icons/react';
import User01 from '../images/user-01.png'; // Avatar image
import { useDispatch, useSelector } from 'react-redux';
import { FetchFriendRequests } from "../state/slices/friends";
import { toast } from 'react-toastify';

const exampleRequests = [
    { id: 1, name: "Ash", avatar: User01 },
    { id: 2, name: "John Doe", avatar: User01 },
    { id: 3, name: "Jane Smith", avatar: User01 },
    { id: 4, name: "Alice Johnson", avatar: User01 },
];

export default function FriendRequests() {
    const [activeTab, setActiveTab] = useState('requests');
    const [requests, setRequests] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {
        // Replace with real data fetching logic

        setRequests(exampleRequests);
    }, []);

    const handleAddFriend = async (name) => {
        try {


            toast.success(`${name} added as a friend!`);
        } catch (error) {
            toast.error('Failed to add friend.');
        }
    };

    return (
        <div className="w-full rounded-sm border border-stroke bg-white py-7.5 px-20 shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-stroke dark:border-strokedark pb-4">
                <button
                    onClick={() => setActiveTab('requests')}
                    className={`text-lg font-medium pb-2 ${activeTab === 'requests'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-bodydark hover:text-primary dark:text-bodydark2 dark:hover:text-primary'
                        }`}
                >
                    Friend Requests
                </button>
                <button
                    onClick={() => setActiveTab('add')}
                    className={`text-lg font-medium pb-2 ${activeTab === 'add'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-bodydark hover:text-primary dark:text-bodydark2 dark:hover:text-primary'
                        }`}
                >
                    Add Friend
                </button>
            </div>

            {/* Content */}
            <div className="mt-6">
                {activeTab === 'requests' && (
                    <div>
                        {/* Scrollable Friend Requests list */}
                        <div className="max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-hide -mx-4">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center cursor-pointer space-x-4 p-4 hover:bg-gray-2 dark:hover:bg-boxdark-2 transition-colors duration-200 border-b border-stroke"
                                >
                                    <img
                                        src={request.avatar}
                                        alt={request.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                                    />
                                    <div className="flex-1">
                                        <p className="text-lg font-medium text-black dark:text-white">{request.name}</p>
                                        <p className="text-sm">Sent you a friend request</p>
                                    </div>
                                    <div className="ml-auto flex items-center space-x-2">
                                        <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
                                            Accept
                                        </button>
                                        <button className="bg-red text-white px-4 py-2 rounded-full hover:opacity-90 transition-colors duration-200">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'add' && (
                    <div className="space-y-6 max-w-150">
                        <h3 className="text-xl font-medium">Add a Friend</h3>
                        <div className="flex items-center space-x-4 p-4 border-b border-stroke">
                            <input
                                type="text"
                                placeholder="Enter friend's name"
                                className="w-full px-4 py-2 rounded-lg text-black dark:text-white border border-stroke dark:border-strokedark bg-transparent"
                            />
                            <button
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                            //onClick={() => handleAddFriend('John Doe')} // Replace with dynamic input
                            >
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
