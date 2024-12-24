import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Chat,
    ChatTeardrop,
    SignOut,
    UserCircle,
} from '@phosphor-icons/react';
import DarkMode from "../components/DarkMode";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../state/slices/auth";

const Icons = [
    {
        key: 0,
        title: 'Chat',
        icon: <Chat size={24} />,
        path: '/dashboard'
    },

    {
        key: 1,
        title: 'Profile',
        icon: <UserCircle size={24} />,
        path: '/dashboard/profile'
    }
];

export default function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const handleClick = (key) => {
        navigate(Icons[key].path);
        setSelected(key);
    };

    return (
        <div className="flex flex-col border-r border-stroke p-2 dark:border-strokedark">
            <div className="flex flex-col items-center space-y-5">
                <ChatTeardrop size={24} className='text-primary' />
                {Icons.map((icon) => (
                    <div
                        key={icon.key}
                        className="space-y-2 flex flex-col text-center hover:cursor-pointer hover:text-primary"
                        onClick={() => { handleClick(icon.key) }}
                    >
                        <div className={`mx-auto border rounded-md border-stroke p-2 dark:border-strokedark ${selected === icon.key && 'bg-primary bg-opacity-90 text-white'}
                        hover:border-primary dark:hover:border-primary`}>
                            {icon.icon}
                        </div>
                        <span className={`font-medium text-sm ${selected === icon.key && 'text-primary'}`}>{icon.title}</span>
                    </div>
                ))
                }
            </div >

            <div className="flex flex-col grow"></div>
            <div className="space-y-4.5">
                <div className='flex flex-row items-center justify-center'>
                    <DarkMode />
                </div>

                <button onClick={() => {
                    dispatch(LogOutUser(navigate));
                }} className="flex flex-row items-center justify-center border rounded-md border-stroke p-2 dark:border-strokedark hover:bg-stone-100 hover:cursor-pointer">
                    <SignOut size={24} />
                </button>
            </div>
        </div >
    );
}
