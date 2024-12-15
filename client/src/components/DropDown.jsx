import React, { useState, useRef, useEffect } from 'react';
import { DotsThree, Pencil, Trash } from '@phosphor-icons/react';

export default function DropDown() {
    const [isOpen, setIsOpen] = useState(false);
    const trigger = useRef(null);
    const dropDown = useRef(null);

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
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <DotsThree weight='bold' size={24} />
            </button>

            {/* Dropdown menu */}
            <div
                ref={dropDown}
                className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke 
                    bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark 
                    ${isOpen ? 'block' : 'hidden'}`}
            >
                <button className='flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4'>
                    <Pencil size={20} />
                    Edit
                </button>
                <button className='flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4'>
                    <Trash size={20} />
                    Delete
                </button>
            </div>
        </div>
    );
}
