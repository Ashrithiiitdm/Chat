import { Check, Checks } from '@phosphor-icons/react'
import React from 'react'
import AudioWave from '../AudioWave'

export default function Audio(props) {
    if (props.incoming) {
        return (
            <div className='max-w-125'>
                <div className='mb-2.5 rounded-2xl rounded-tl-none px-5 py-3 bg-gray dark:bg-boxdark-2'>
                    <AudioWave src={props.src} incoming={props.incoming} />
                </div>
                <p className='text-xs'>{props.time}</p>
            </div>
        )
    }
    else {
        return (
            <div className='max-w-125 ml-auto'>
                <div className='mb-2.5 rounded-2xl rounded-br-none px-5 py-3'>
                    <AudioWave src={props.src} incoming={props.incoming} />
                </div>
                <div className='flex flex-row items-center justify-end space-x-2'>
                    <div className={`${props.status !== 'read' ? 'text-body dark:text-white' : 'text-primary'}`}>
                        {props.status !== 'sent' ? (<Checks weight='bold' size={18} />) : (<Check weight='bold' size={18} />)}
                    </div>
                    <p className='text-xs text-right'>{props.time}</p>
                </div>
            </div>
        )
    }
}
