import { MagnifyingGlass } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import User01 from '../../images/user-01.png';
import { FetchUsers } from "../../state/slices/friends";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../state/slices/chats";

export default function ChatList() {
    const [selected, setSelected] = useState(0);

    const { onlineUsers } = useSelector((state) => state.auth);
    const { users, isLoading } = useSelector((state) => state.friends);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-full flex-col xl:flex xl:w-1/4">
            <div className="sticky border-b border-stroke dark:border-strokedark px-6 py-7.5 flex flex-row">
                <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
                    Active Conversations
                </h3>
                <span className="rounded-md border-[.5px] border-stroke dark:border-strokedark bg-gray px-2 py-0.5 text-base font-medium text-black dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
                    {users?.length || 0}
                </span>
            </div>
            <div className="flex max-h-full flex-col overflow-auto p-5">
                <form className="sticky mb-7">
                    <input
                        placeholder="Search Chats"
                        type="text"
                        className="w-full rounded border border-stroke bg-gray-2 py-2.5 
                        pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2">
                        <MagnifyingGlass size={20} />
                    </button>
                </form>
                <div className="no-scrollbar overflow-auto max-h-full space-y-2.5">
                    {users &&
                        users.map((obj, index) => (
                            <div
                                className={`flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark ${selected === index ? 'bg-gray dark:bg-boxdark-2' : ''
                                    }`}
                                key={index}
                                onClick={() => {
                                    setSelected(index);
                                    dispatch(selectUser({ user: obj }));
                                }}
                            >
                                <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                                    <img
                                        src={obj.avatar || User01}
                                        alt="Profile"
                                        className="h-full w-full rounded-full object-cover object-center"
                                    />
                                    <span
                                        className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 ${Array.isArray(onlineUsers) && onlineUsers.includes(obj.user_id)
                                                ? 'bg-success'
                                                : 'bg-danger'
                                            }`}
                                    ></span>
                                </div>
                                <div className="w-full">
                                    <h5 className="text-sm font-medium text-black dark:text-white">
                                        {obj.user_name}
                                    </h5>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
