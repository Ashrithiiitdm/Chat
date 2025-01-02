import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchMessages, SendMessage } from '../../state/slices/chats.js';
import { toast } from 'react-toastify';

const Inbox = () => {
    const dispatch = useDispatch();
    const { selectedUser, messages, isMessagesLoading } = useSelector((state) => state.chats);
    const [text, setText] = useState('');
    const [imgPreview, setImgPreview] = useState('');

    useEffect(() => {
        if (selectedUser?.user_id) {
            dispatch(FetchMessages(selectedUser.user_id));
        }
    }, [selectedUser, dispatch]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim() && !imgPreview) return;

        const messageData = {
            text: text.trim(),
            image: imgPreview,
        };
        dispatch(SendMessage(messageData));
        setText('');
        setImgPreview('');
    };

    if (!selectedUser) {
        return <p className='text-center'>Please select a user to start chatting.</p>;
    }

    return (
        <div className="inbox">
            <div className="messages-container overflow-y-auto p-4">
                {isMessagesLoading ? (
                    <p>Loading messages...</p>
                ) : messages.length === 0 ? (
                    <p className="text-center">No messages yet. Start the conversation!</p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-100 ${msg.sender === selectedUser.user_id ? '' : 'ml-auto'}`}
                        >
                            <div
                                className={`mb-2.5 rounded-2xl ${msg.sender === selectedUser.user_id
                                    ? 'rounded-tl-none bg-gray dark:bg-boxdark-2'
                                    : 'rounded-br-none bg-primary text-white'
                                    } px-5 py-3`}
                            >
                                <p>{msg.text}</p>
                            </div>
                            <p className="text-sm">{new Date(msg.created_at).toLocaleTimeString()}</p>
                        </div>
                    ))
                )}
            </div>
            <form onSubmit={handleSendMessage} className="message-input mt-4 flex items-center">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-lg px-3 py-2"
                />
                <button type="submit" className="ml-2 bg-primary text-white px-4 py-2 rounded-lg">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Inbox;
