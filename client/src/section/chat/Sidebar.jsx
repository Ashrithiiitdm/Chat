import React from "react";
import {
    Chat,
    DotsThreeCircle,
    SignOut,
    Users,
    UserCircle,
} from '@phosphor-icons/react';
import DarkMode from "../../components/DarkMode";

const Icons = [
    {
        key: 0,
        title: 'Chat',
        icon: <Chat size={24} />,
    },
    {
        key: 1,
        title: 'Groups',
        icon: <Users size={24} />,
    },
    {
        key: 2,
        title: 'Profile',
        icon: <UserCircle size={24} />,
    },
    {
        key: 3,
        title: 'More',
        icon: <DotsThreeCircle size={24} />,
    },
];

export default function Sidebar() {
    return (
        <div className="flex flex-col border-r border-stroke p-2 dark:border-strokedark">
            <div className="flex flex-col items-center space-y-5">
                {Icons.map((icon) => (
                    <div
                        key={icon.key}
                        className="space-y-2 flex flex-col text-center hover:cursor-pointer hover:text-primary"
                        onClick={() => { }}
                    >
                        <div className="mx-auto border rounded-md border-stroke p-2 dark:border-strokedark">
                            {icon.icon}
                        </div>
                        <span className="font-medium text-sm">{icon.title}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col grow"></div>
            <div className="space-y-4.5">
                <DarkMode />
                <div className="mx-auto border rounded-md border-stroke p-2 dark:border-strokedark hover:bg-stone-100 hover:cursor-pointer">
                    <SignOut size={24} />
                </div>
            </div>
        </div>
    );
}
