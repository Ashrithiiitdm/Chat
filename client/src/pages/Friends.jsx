import React, { useEffect, useState } from "react";
import { ChatTeardrop } from '@phosphor-icons/react';
import User01 from '../images/user-01.png';
import { FetchFriends } from "../state/slices/friends";
import { useDispatch, useSelector } from "react-redux";

// Example data for friends (you can replace this with real data from an API or Redux store)
const exampleFriends = [
    { id: 1, name: "John Doe", avatar: User01 },
    { id: 2, name: "Jane Smith", avatar: User01 },
    { id: 3, name: "Alice Johnson", avatar: User01 },
    { id: 4, name: "Bob Brown", avatar: User01 },
    { id: 5, name: "Charlie Davis", avatar: User01 },
    { id: 6, name: "David Green", avatar: User01 },
    { id: 7, name: "Eve White", avatar: User01 },
    { id: 8, name: "Frank Black", avatar: User01 },
];

export default function FriendsPage() {
    const [friends, setFriends] = useState([]);
    const dispatch = useDispatch();
    const { friends: friendsList } = useSelector((state) => state.friends);

    console.log(friendsList);

    useEffect(() => {
        // Simulate fetching friends data (replace with API call if needed)
        dispatch(FetchFriends());
        setFriends(friendsList);
    }, []);

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold dark:text-gray text-form-strokedark mb-8 flex items-center">
                    Friends
                </h2>

                {/* Scrollable Friends list with hidden scrollbar */}
                <div className="max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-hide -mx-4">
                    {friends.map((friend) => (
                        <div
                            key={friend.friend_id}
                            className="flex items-center cursor-pointer  space-x-4 p-4 hover:bg-gray-2 dark:hover:bg-boxdark-2  duration-200 border-b border-stroke"
                        >
                            <img
                                src={friend.avatar}
                                alt={friend.friend_name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-medium text-black dark:text-white">{friend.friend_name}</p>
                                <p className="text-sm">{friend.friend_status}</p>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center">
                                <ChatTeardrop className="mr-1" size={18} />
                                Message
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
