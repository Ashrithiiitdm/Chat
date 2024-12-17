import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Image, File } from '@phosphor-icons/react';
import { useDispatch } from 'react-redux';
import { ToggleMediaModal, ToggleDocModal } from '../state/slices/app';

export default function Attacher() {
    const [isOpen, setIsOpen] = useState(false);
    const trigger = useRef(null);
    const dropDown = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const clickHandle = (event) => {
            if (!dropDown.current || !trigger.current || !(event.target instanceof Node)) {
                return;
            }
            // Check if the click was outside both dropdown and button
            if (!dropDown.current.contains(event.target) && !trigger.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', clickHandle);

        return () => {
            document.removeEventListener('click', clickHandle);
        };
    }, []);

    useEffect(() => {
        const keyHandle = ({ keyCode }) => {
            //'27' escape keyCode
            if (!isOpen || keyCode !== 27) return;

            setIsOpen(false);
        };

        document.addEventListener('keydown', keyHandle);

        return () => {
            document.removeEventListener('keydown', keyHandle);
        };

    })

    return (
        <div className='relative flex'>
            {/* Button to open dropdown */}
            <button
                className='text-[#98A6AD] hover:text-body'
                ref={trigger}
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen((prev) => !prev)
                }}
            >
                <Paperclip weight='bold' size={20} />
            </button>

            {/* Dropdown menu */}
            <div
                ref={dropDown}
                className={`absolute right-0 -top-24 z-40 w-54 space-y-1 rounded-sm border border-stroke 
                    bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark 
                    ${isOpen ? 'block' : 'hidden'}`}
            >
                <button onClick={() => {
                    dispatch(ToggleMediaModal(true));
                }}
                    className='flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4'>
                    <Image size={20} />
                    Photos & Videos
                </button>
                <button
                    onClick={() => {
                        dispatch(ToggleDocModal(true));
                    }}
                    className='flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4'>
                    <File size={20} />
                    Documents
                </button>
            </div>
        </div >
    );
}
