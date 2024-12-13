import React from 'react';
import { Sidebar } from '../section/chat';

export default function Messages() {
    return (
        <div className='h-screen overflow-hidden'>
            <div className='h-full rounded-sm border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex'></div>
            <Sidebar />
        </div>
    )
}