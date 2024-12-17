import React, { useEffect, useRef } from "react";
import DropZone from "dropzone";
import { UploadSimple } from '@phosphor-icons/react';

export default function FileDrop({ acceptedFiles = 'image/*, video/*',
    maxSize = 16 * 1024 * 1024,
    url = '/file/post' }) {

    const dropRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        DropZone.autoDiscover = false;
        if (!dropRef.current && formRef.current) {
            dropRef.current = new DropZone(formRef.current, {
                url,
                acceptedFiles,
                maxSize: maxSize / 1024 * 1024,
            });
        }
        return () => {
            if (dropRef.current) {
                dropRef.current.destroy();
                dropRef.current = null;
            }
        }
    }, [])

    return (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='p-6.5'>
                <form
                    action={url}
                    ref={formRef}
                    id='upload'
                    className='dropzone rounded-md !border-dashed !border-bodydark1 bg-gray hover:!border-primary dark:!border-strokedark dark:bg-graydark dark:hover:!border-primary'>
                    <div className='dz-message'>
                        <div className='mb-2.5 justify-center flex flex-col items-center space-y-2'>
                            <div className='shadow-10 flex h-15 w-15 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white'>
                                <UploadSimple size={24} />
                            </div>
                            <span className='font-medium text-black dark:text-white'>Drop your files here</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}