import React from "react";
import { Smiley } from '@phosphor-icons/react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState, useRef, useEffect } from "react";

export default function EmojiPicker() {
    const colorMode = JSON.parse(localStorage.getItem('color-theme'));
    const [pickOption, setPickOption] = useState(false);

    const pickerRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleOut = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
                setPickOption(false);
            }
        };
        document.addEventListener('mousedown', handleOut);

        return () => {
            document.removeEventListener('mousedown', handleOut);
        };
    }, [])

    const handleTrigger = (e) => {
        e.preventDefault();
        setPickOption((prev) => !prev);
    }

    return (
        <div className='relative flex'>
            <button ref={buttonRef}
                className='text-[#98A6AD] hover:text-body' onClick={handleTrigger}>
                <Smiley size={20} className='text-body' />
            </button>
            {pickOption && (
                <div ref={pickerRef} className='absolute z-40 -top-115 right-0'>
                    <Picker theme={colorMode} data={data} onEmojiSelect={console.log} />
                </div>
            )}
        </div>
    )
}