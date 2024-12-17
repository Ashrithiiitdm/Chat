import React from 'react'
import { Check, Checks } from '@phosphor-icons/react';

export default function Text(props) {
    if (props.incoming) {
        return (
            <div className='max-w-100'>
                <p className='mb-2.5 text-sm font-medium'>{props.writer}</p>
                <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2'>
                    <p>{props.msg}</p>
                </div>
                <p className='text-xs'>{props.time}</p>
            </div>

        )
    }
    else {
        return (
            <div className='max-w-100 ml-auto'>
                <div className='mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3'>
                    <p className='text-white'>{props.msg}</p>
                </div>
                <div className='flex flex-row items-center justify-end space-x-2'>
                    <div className={`${props.status !== 'read' ? 'text-body dark:text-white' : 'text-primary'}`}>
                        {props.status !== 'sent' ? (<Checks weight='bold' size={18} />) : (<Check weight='bold' size={18} />)}
                    </div>
                    <p className='text-xs'>{props.time}</p>
                </div>

            </div>
        )
    }
}


//Whatsapp

