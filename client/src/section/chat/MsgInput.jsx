import { X } from '@phosphor-icons/react';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function MsgInput() {

    const [text, setText] = useState('');
    const [imgPreview, setImgPreview] = useState(null);
    const fileInputRef = useRef(null);

    const { selectedUser } = useSelector((state) => state.chats);
    const dispatch = useDispatch();

    const handleImageChange = (e) => {

    };

    const removeImage = () => {

    };

    const handleSendImage = () => {

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
        </div>
    );
};
