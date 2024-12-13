import React, { useState } from 'react';
import { FaArrowUp } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';

export const Chat = () => {
    const chatState = useSelector((state: RootState) => state.chat)
    const [input, setInput] = useState<string>('');
    const selectedChat = chatState.categories[chatState.selectedChatInfo?.category]?.find(
        (chat) => chat.id === chatState.selectedChatInfo?.id
    );

    const handleSendMessage = () => {
        if (input.trim()) {
            // setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div className="flex-1 p-4 flex flex-col bg-white shadow-md rounded-tl-lg rounded-tr-lg md:rounded-none pt-[60px]">
            <h1 className='text-lg text-center text-pretty'>{selectedChat?.title}</h1>
            <div className="flex-1 overflow-y-auto">
                {selectedChat?.messages.map((msg, index) => (
                    <React.Fragment key={index}>
                        <div className="flex justify-end py-3">
                            <span className='bg-gray-100 px-2 py-1 rounded-md'>{msg.question}</span>
                        </div>
                        <div className='text-left py-3'>
                            {msg.answer}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className="flex items-center mt-4">
                <input
                    type="text"
                    className="flex-1 p-[0.2rem] border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                    onClick={handleSendMessage}
                >
                    <FaArrowUp />
                </button>
            </div>
        </div>
    );
};
