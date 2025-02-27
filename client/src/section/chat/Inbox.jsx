import React, { useState, useEffect } from "react";
import User01 from '../../images/user-01.png';
import { Microphone, PaperPlaneTilt, Phone, VideoCamera } from "@phosphor-icons/react";
import DropDown from "../../components/DropDown";
import EmojiPicker from "../../components/EmojiPicker";
import UserInfo from "./UserInfo";
import { useSelector, useDispatch } from "react-redux";
import { ToggleAudioModal } from "../../state/slices/app";
import Attacher from "../../components/FileAttacher";
import Separator from "../../components/Sep";
import { Document, Audio, VideoImg } from "../../components/Msgs/export";
import Aud from '../../audio.webm';
import { FetchMessages } from "../../state/slices/chats";


export default function MsgInbox() {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(false);

    const { messages, isMessagesLoading, selectedUser } = useSelector((state) => state.chats);

    // console.log(selectedUser);

    // useEffect(() => {
    //     dispatch(FetchMessages(selectedUser.user_id));
    // }, [dispatch, selectedUser.user_id]);



    const handleToggle = () => {
        setUserInfo((prev) => !prev);
    }

    const handleMic = (e) => {
        e.preventDefault();
        dispatch(ToggleAudioModal(true));
    }

    if (isMessagesLoading) {
        return (
            <div className='flex justify-center items-center h-full'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-primary'></div>
            </div>
        )
    }

    return (
        <>
            <div className={`flex h-full flex-col border-l border-stroke dark:border-strokedark ${userInfo === true ? 'xl:w-1/2' : 'xl:w-3/4'} `}>
                <div className='sticky flex items-center flex-row justify-between border-b border-stroke 
            dark:border-strokedark px-6 py-4.5'>
                    <div className='flex items-center' onClick={handleToggle}>
                        <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
                            <img src={selectedUser?.avatar ?? User01} alt='Avatar' className='h-full w-full object-cover object-center'></img>
                        </div>
                        <div>
                            <h5 className='font-medium text-black dark:text-white'>
                                {selectedUser?.user_name ?? 'Ash'}
                            </h5>
                            <p className='text-sm'> Reply to message</p>
                        </div>
                    </div>
                    <div className='flex flex-row items-center space-x-8'>
                        <button >
                            <VideoCamera size={24} weight='bold' />
                        </button>
                        <button >
                            <Phone size={24} weight='bold' />
                        </button>
                        <DropDown />

                    </div>
                </div>

                {/**Displaying messages */}
                <div className='max-h-full space-y-3.5 overflow-auto no-scrollbar px-6 py-7.5 grow'>
                    <div className='max-w-100'>
                        <p className='mb-2.5 text-sm font-medium'>Ash</p>
                        <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2'>
                            <p>Hi how are you?</p>
                        </div>
                        <p className='text-sm'>1:55pm</p>
                    </div>

                    <div className='max-w-100 ml-auto'>
                        <div className='mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3'>
                            <p className='text-white'>Hi how are you?</p>
                        </div>
                        <p className='text-sm'>2:00pm</p>
                    </div>
                    <div className='max-w-100'>
                        <p className='mb-2.5 text-sm font-medium'>Ash</p>
                        <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2'>
                            <p>Hi how are you?</p>
                        </div>
                        <p className='text-sm'>1:55pm</p>
                    </div>
                    <Separator />
                    <Document writer="Ash" incoming={false} status='read' time='4:32pm' />
                    <Audio incoming={false} src={Aud} status='delivered' time='4:32pm' />
                    <div className='max-w-100 ml-auto'>
                        <div className='mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3'>
                            <p className='text-white'>Hi how are you?</p>
                        </div>
                        <p className='text-sm'>2:00pm</p>
                    </div>
                    <div className='max-w-100'>
                        <p className='mb-2.5 text-sm font-medium'>Ash</p>
                        <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2'>
                            <p>Hi how are you?</p>
                        </div>
                        <p className='text-sm'>1:55pm</p>
                    </div>
                    <Separator />
                    <VideoImg writer="Ash" incoming={false} status='read' time='4:32pm' />
                    <div className='max-w-100 ml-auto'>
                        <div className='mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3'>
                            <p className='text-white'>Hi how are you?</p>
                        </div>
                        <p className='text-sm'>2:00pm</p>
                    </div>
                    <div className='max-w-100'>
                        <p className='mb-2.5 text-sm font-medium'>Ash</p>
                        <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2'>
                            <p>Hi how are you?</p>
                        </div>
                        <p className='text-sm'>1:55pm</p>
                    </div>
                    <Separator />
                    <div className='max-w-100 ml-auto'>
                        <div className='mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3'>
                            <p className='text-white'>Hi how are you?</p>
                        </div>
                        <p className='text-sm'>2:00pm</p>
                    </div>

                </div>

                {/**Input Section */}
                <div className='sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-x-strokedark dark:bg-boxdark'>
                    <form className='flex items-center justify-between space-x-4.5 mb-3'>
                        <div className='relative w-full'>
                            <input
                                type='text'
                                placeholder='Type Something Here'
                                className='h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 
                            text-black placholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white'>
                            </input>
                            <div className='absolute right-5 top-1/2 -translate-y-1/2 items-center justify-end space-x-4'>
                                <button
                                    className='hover:text-primary'>
                                    <Attacher />
                                </button>
                                <button className='hover:text-primary'>
                                    <EmojiPicker />
                                </button>
                                <button className='hover:text-primary'>
                                    <Microphone onClick={handleMic} />
                                </button>
                            </div>
                        </div>
                        <button className='flex items-center justify-center h-13 max-w-13 w-full rounded-md bg-primary text-white hover:bg-opacity-90'>
                            <PaperPlaneTilt size={24} weight='bold' />
                        </button>
                    </form>
                </div>
            </div>

            {/**User Info */}
            {userInfo &&
                <div className='w-1/4'>
                    <UserInfo handleToggle={handleToggle} />
                </div>
            }

        </>
    )
}