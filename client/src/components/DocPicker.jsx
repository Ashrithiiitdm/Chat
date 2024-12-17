import { PaperPlaneTilt, X } from '@phosphor-icons/react';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleDocModal } from '../state/slices/app';
import FileDrop from './FileDrop';

export default function DocPicker() {
    const modalRef = useRef(null);
    const dispatch = useDispatch();

    const { doc } = useSelector((state) => state.app.modals);

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (keyCode === 27 && !doc) {
                return;
            }

            dispatch(
                ToggleDocModal(false),
            );

        };

        document.addEventListener('keydown', keyHandler);

        return () => {
            document.removeEventListener('keydown', keyHandler);
        }

    });

    return (
        <div className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5
            ${doc ? 'block' : 'hidden'}`}>
            <div ref={modalRef} className='md:px-17.5 w-full max-w-142.5 rounded-lg bg-white dark:bg-boxdark md:py-8 px-8 py-12'>
                <div className='flex flex-row items-center justify-between mb-8 space-x-2'>
                    <div className='text-md font-medium text-black dark:text-white'>
                        Choose Files to Send
                    </div>
                    <button onClick={() => {
                        dispatch(ToggleDocModal(false));
                    }}>
                        <X size={24} />
                    </button>
                </div>

                <FileDrop
                    acceptedFiles='.pdf, .doc, .docx, .txt, .xls, .xlsx, .ppt, .pptx, .csv, .js, .jsx, .c, .cpp, .odt, .yaml, .html, .css, .sql'
                    maxSize={64 * 1024 * 1024} />
                {/* Input bar */}
                <div className='flex flex-row items-center space-x-2 justify-between mt-4'>
                    <input type='text'
                        className='border rounded-lg hover:border-primary outline-none w-full p-2 border-stroke dark:border-strokedark'
                        placeholder='Type a message' />
                    <button className='p-2.5 border border-primary flex items-center justify-center rounded-lg bg-primary'>
                        <PaperPlaneTilt size={24} weight='bold' />
                    </button>

                </div>
            </div>
        </div >
    )

}