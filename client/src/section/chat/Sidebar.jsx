import React from "react";
import { Chat, SignOut } from '@phosphor-icons/react';
import DarkMode from "../../components/DarkMode";
export default function Sidebar() {
    return (
        <div className='flex flex-col border-r border-stroke p-2 dark:border-strokedark'>
            <div className="mx-auto border rounded-md border-stroke p-2 dark:border-strokedark">
                <Chat size={24} />
            </div>
            <div className="flex flex-col grow"></div>
            <div className="space-y-4.5">
                <DarkMode />
                <div className="mx-auto border rounded-md border-stroke p-2 dark:border-strokedark hover:bg-stone-100 hover:cursor-pointer">
                    <SignOut size={24} />
                </div>
            </div>

        </div>
    )
}