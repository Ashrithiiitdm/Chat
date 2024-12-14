import React from 'react';
import { ChatList, MsgInbox, Sidebar } from '../section/chat/index';

export default function Messages() {
    return (
        <div className='h-screen overflow-hidden'>
            <div className='h-full rounded-sm border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex'>
                <Sidebar />
                <ChatList />
                <MsgInbox />
            </div>
        </div>
    )
}