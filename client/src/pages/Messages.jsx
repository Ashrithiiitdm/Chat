import React from 'react';
import { ChatList, MsgInbox } from '../section/chat';
import VoiceRecorder from '../components/VoiceRecorder';
import MediaPicker from '../components/MediaPicker';
import DocPicker from '../components/DocPicker';

export default function Messages() {
    return (
        <>
            <div className='flex w-full'>
                <ChatList />
                <MsgInbox />
            </div>
            <VoiceRecorder />
            <MediaPicker />
            <DocPicker />

        </>
    );
}
