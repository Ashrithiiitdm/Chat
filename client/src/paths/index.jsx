import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
    return (
        <div className="h-[calc(100vh)]  overflow-hidden sm:h-screen">
            {/* Sidebar */}
            <div className="h-full rounded-sm border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:w-1/4">
                <Sidebar />
                <Outlet />
            </div>

        </div>
    );
}

