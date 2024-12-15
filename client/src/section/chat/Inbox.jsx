import React from "react";
import User01 from '../../images/user-01.png';
import { DotsThree, LinkSimple, PaperPlaneTilt, Smiley } from "@phosphor-icons/react";

export default function MsgInbox() {
    return (
        <div className='flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4'>
            <div className='sticky flex items-center flex-row justify-between border-b border-stroke 
            dark:border-strokedark px-6 py-4.5'>
                <div className='flex items-center'>
                    <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
                        <img src={User01} alt='Avatar' className='h-full w-full object-cover object-center'></img>
                    </div>
                    <div>
                        <h5 className='font-medium text-black dark:text-white'>
                            Ash
                        </h5>
                        <p className='text-sm'> Reply to message</p>
                    </div>
                </div>
                <div>
                    <DotsThree weight='bold' size={24} />
                </div>
            </div>

            {/**Displaying messages */}
            <div className='max-h-full space-y-3.5 overflow-auto no-scrollbar px-6 py-7.5 grow'>
                <div className='max-w-125'>
                    <p className='mb-2.5 text-sm font-medium'>Ash</p>
                    <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2'>
                        <p>Manchidi raww...</p>
                    </div>
                    <p className='text-sm'>1:55pm</p>
                </div>

                <div className='max-w-125 ml-auto'>
                    <div className='mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3 dark:bg-boxdark-2'>
                        <p className='text-white'>Manchidi kAAdu rAA...</p>
                    </div>
                    <p className='text-sm'>2:00pm</p>
                </div>

            </div>

            {/**Input Section */}
            <div className='sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-x-strokedark dark:bg-boxdark'>
                <form className='flex items-center justify-between space-x-4.5'>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            placeholder='Type Something Here'
                            className='h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 
                            text-black placholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white'>
                        </input>
                        <div className='absolute right-5 top-1/2 -translate-y-1/2 items-center justify-end space-x-4'>
                            <button className='hover:text-primary'>
                                <LinkSimple size={20} />
                            </button>
                            <button className='hover:text-primary'>
                                <Smiley size={20} />
                            </button>
                        </div>
                    </div>
                    <button className='flex items-center justify-center h-13 max-w-13 w-full rounded-md bg-primary text-white hover:bg-opacity-90'>
                        <PaperPlaneTilt size={24} weight='bold' />
                    </button>
                </form>
            </div>
        </div>
    )
}