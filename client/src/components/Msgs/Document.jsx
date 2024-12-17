import React from 'react'
import { File, DownloadSimple, Checks, Check } from '@phosphor-icons/react';

export default function Document(props) {
    if (props.incoming) {
        return (
            <div className='max-w-125 w-fit'>
                <p className='mb-2.5 text-sm font-medium capitalize'>{props.writer}</p>
                <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2 space-y-2'>
                    <div className='flex flex-row items-center justify-between p-2 bg-gray-3 rounded-md dark:bg-boxdark'>
                        <div className='flex flex-row items-center space-x-3'>
                            <div className='p-2 rounded-md bg-primary/80 text-white'>
                                <File size={20} />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <div>File_1v0100010010.zip</div>
                                <div className='text-sm font-medium'>12.5 MB</div>
                            </div>
                        </div>
                        <button className='pl-5'>
                            <DownloadSimple size={20} />
                        </button>
                    </div>
                    <p>Text...</p>
                </div>
                <p className='text-xs'>{props.time}</p>
            </div>
        )
    }
    else {
        return (
            <div className='max-w-2xl w-fit ml-auto'>
                <div className='mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3 text-white space-y-2'>
                    <div className='flex flex-row items-center justify-between p-2  rounded-md'>
                        <div className='flex flex-row items-center space-x-3'>
                            <div className='p-2 rounded-md bg-stroke text-primary'>
                                <File size={20} />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <div>File_1v0100010010.zip</div>
                                <div className='text-sm font-medium'>12.5 MB</div>
                            </div>
                        </div>
                        <button className='pl-5'>
                            <DownloadSimple size={20} />
                        </button>
                    </div>
                    <p>Text...</p>
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
