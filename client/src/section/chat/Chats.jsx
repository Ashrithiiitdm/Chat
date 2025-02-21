import { MagnifyingGlass } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import User01 from '../../images/user-01.png';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const List = [
    {
        imgSrc: User01,
        name: "Ash",
        message: "Hi how are you?",
    },

    {
        imgSrc: User01,
        name: "Ash",
        message: "Hi how are you?",
    },

    {
        imgSrc: User01,
        name: "Ash",
        message: "Hi how are you?",
    },

    {
        imgSrc: User01,
        name: "Ash",
        message: "Hi how are you?",
    },

    {
        imgSrc: User01,
        name: "Ash",
        message: "Hi how are you?",
    },

    {
        imgSrc: User01,
        name: "Ash",
        message: "Hi how are you?",
    },

    {
        imgSrc: User01,
        name: "Ash",
        message: "Hi how are you?",
    },

    {
        imgSrc: User01,
        name: "Ash",
        message: "Hi how are you?",
    }

]


export default function ChatList() {

    const [selected, setSelected] = useState(0);

    const { users, isUserLoading, isMessagesLoading, messages } = useSelector((state) => state.chats);
    const dispatch = useDispatch();

    

    if (isUserLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='h-full flex-col x1:flex x1:w-1/4'>
            <div className='sticky border-b border-stroke dark:border-strokedark px-6 py-7.5 flex flex-row'>
                <h3 className='text-lg font-medium text-black dark:text-white 2xl:text-xl'>
                    Active Conversations
                </h3>
                <span className="rounded-md border-[.5px] border-stroke dark:border-strokedark bg-gray px-2 py-0.5 text-base font-medium text-black dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
                    8
                </span>
            </div>
            <div className='flex max-h-full flex-col overflow-auto p-5'>
                <form className='sticky mb-7'>
                    <input placeholder="Search Chats" type="text" className='w-full rounded border border-stroke bg-gray-2 py-2.5 
                        pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2' />
                    <button className='absolute right-4 top-1/2 -translate-y-1/2'>
                        <MagnifyingGlass size={20} />
                    </button>
                </form>
                <div className='no-scrollbar overflow-auto max-h-full space-y-2.5'>
                    {/** This part is for the message overview */}
                    {List.map((obj, item) => {
                        return <div className={`flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark ${selected === item ? 'bg-gray dark:bg-boxdark-2' : 'hover:bg-gray-2 dark:hover:bg-boxdark-2/90'}`}
                            key={item}
                            onClick={() => { setSelected(item); }}
                        >
                            <div className='relative mr-3.5 h-11 w-full max-w-11 rounded-full'>
                                <img src={obj.imgSrc} alt='Profile' className='h-full w-full rounded-full object-cover object-center'></img>
                                {/**Span part is for the green online symbol */}
                                <span className='absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success'>
                                </span>
                            </div>
                            <div className='w-full'>
                                <h5 className='text-sm font-medium text-black dark:text-white'>{obj.name}</h5>
                                <p className='text-sm'>{obj.message}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div >

    )
}