import { X } from '@phosphor-icons/react';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function MsgInput() {

   

    const { selectedUser } = useSelector((state) => state.chats);
    const dispatch = useDispatch();

    

    const handleSendMessage = () => {

    };

    return (
        <div className='p-4 w-full'>
            {imgPreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img src={imgPreview} alt='Preview' className='w-20 h-20 object-cover rounded-lg border border-strokedark' />
                    </div>
                    <button onClick={removeImage} className='text-primary'>
                        <X size={20} />
                    </button>
                </div>
            )}

            <form onSubmit={handleSendMessage} className='flex items-center gap-3 '>
                <div className='flex-1 flex gap-2'>
                
                </div>
            </form>

        </div>
    );
};
