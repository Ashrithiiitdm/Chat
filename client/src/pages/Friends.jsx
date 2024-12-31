import React, { useEffect } from "react";
import { ChatTeardrop } from '@phosphor-icons/react';
import User01 from '../images/user-01.png';
import { FetchFriends } from "../state/slices/friends";
import { useDispatch, useSelector } from "react-redux";

export default function FriendsPage() {
    const dispatch = useDispatch();

    // Get the friends list directly from Redux state
    const { friends: friendsList } = useSelector((state) => state.friends);

    // Fetch friends when the component mounts
    useEffect(() => {
        dispatch(FetchFriends());
    }, [dispatch]);

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold dark:text-gray text-form-strokedark mb-8 flex items-center">
                    Friends
                </h2>

                {/* Scrollable Friends list with hidden scrollbar */}
                <div className="max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-hide -mx-4">
                    {friendsList.map((friend) => (
                        <div
                            key={friend.friend_id}
                            className="flex items-center cursor-pointer  space-x-4 p-4 hover:bg-gray-2 dark:hover:bg-boxdark-2  duration-200 border-b border-stroke"
                        >
                            <img
                                src={friend.avatar || User01}
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
