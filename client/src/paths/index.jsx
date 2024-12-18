import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function index() {
    return (
        <div className='h-[calc(100vh] overflow-hidden sm:h-screen'>
            <div className='h-full rounded-sm border-stroke bg-white shadow-default dark:bg-strokedark dark:border-strokedark xl:flex flex'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}
