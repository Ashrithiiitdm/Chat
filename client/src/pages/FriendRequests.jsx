'use client'

import React, { useEffect, useState } from "react";
import { ChatTeardrop } from '@phosphor-icons/react';
import User01 from '../images/user-01.png'; // Avatar image

// Example data for friend requests (you can replace this with real data from an API or Redux store)
const exampleRequests = [
    { id: 1, name: "Ash", avatar: User01 },
    { id: 2, name: "John Doe", avatar: User01 },
    { id: 3, name: "Jane Smith", avatar: User01 },
    { id: 4, name: "Alice Johnson", avatar: User01 },
];

export default function FriendRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Simulate fetching friend request data (replace with API call if needed)
        setRequests(exampleRequests);
    }, []);

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-strokedark mb-8 flex items-center">
                    Friend Requests
                </h2>

                {/* Scrollable Friend Requests list with hidden scrollbar */}
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
        </div>
    );
}
