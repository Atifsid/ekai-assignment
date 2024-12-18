import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../lib/store';
import { sendMessage, updateChatHeading } from '../lib/features/chat/chatSlice';
import { MdCancel, MdOutlineSpeakerNotesOff } from "react-icons/md";
import { Input } from './Input';

export const Chat = () => {
    const chatState = useSelector((state: RootState) => state.chat)
    const [newMessage, setNewMessage] = useState<string>('');
    const selectedChat = chatState.categories[chatState.selectedChatInfo?.categoryId]?.find(
        (chat) => chat.id === chatState.selectedChatInfo?.chatId
    );
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [heading, setHeading] = useState('');
    const [editHeading, setEditHeading] = useState(false);

    useEffect(() => {
        setHeading('');
        setEditHeading(false);
    }, [chatState.selectedChatInfo])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setLoading(true);
            setTimeout(() => {
                dispatch(sendMessage({ question: newMessage }));
                setNewMessage('');
                setLoading(false);
            }, 2000)
        }
    }

    const onSaveHeading = (key: string) => {
        if (key == 'Enter') {
            setEditHeading(false);
            handleSaveHeading();
        }
    }

    const handleSaveHeading = () => {
        if (heading && heading.trim().length > 0) {
            dispatch(updateChatHeading({ heading: heading }));
            setEditHeading(false);
        }
    }

    const handleEditHeading = () => {
        setHeading(selectedChat?.title!);
        setEditHeading(true);
    }

    const handleEnterSendMessage = (e: any) => {
        if (selectedChat) {
            setNewMessage(e.target.value);
            if (e.key == 'Enter') {
                handleSendMessage();
            }
        }
    }

    return (
        <div className={`flex-1 h-screen p-4 flex flex-col shadow-md pt-[60px] relative`} style={{ backgroundColor: chatState.categoryBgColors[chatState.selectedChatInfo.categoryId] }}>
            <div className='absolute left-0 right-0 w-full' style={{ backgroundColor: chatState.categoryBgColors[chatState.selectedChatInfo.categoryId] }}>
                {!editHeading && <h1 className={`text-center text-[1.8rem] cursor-pointer`} style={{ color: chatState.categoryTextColors[chatState.selectedChatInfo.categoryId] }} onClick={handleEditHeading}>{selectedChat?.title}</h1>}
                {editHeading &&
                    <div className='flex justify-center mb-4'>
                        <div className={`flex items-center gap-2`} style={{ color: chatState.categoryTextColors[chatState.selectedChatInfo.categoryId] }}>
                            <Input
                                className='px-[0.2rem] py-[0.4rem] lg:text-[1.8rem] text-[1.1rem] text-primary text-center border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200'
                                text={heading!} placeholder={'Enter New Heading'}
                                onChangeText={(e: any) => setHeading(e.target.value)}
                                onKeyPressHandler={(e: any) => onSaveHeading(e.key)} />
                            <FaCheckCircle size={25} className='cursor-pointer' onClick={handleSaveHeading} />
                            <MdCancel size={28} className='cursor-pointer' onClick={() => setEditHeading(false)} />
                        </div>
                    </div>
                }
            </div>
            <div className='flex-1 overflow-y-auto mt-[45px]'>
                <div className='flex justify-center'>
                    <div className="w-full lg:w-[95%]">
                        {selectedChat ? selectedChat?.messages.map((msg, index) => (
                            <React.Fragment key={index}>
                                <div className="flex justify-end py-3">
                                    <span style={{ backgroundColor: chatState.categoryAccentColors[chatState.selectedChatInfo.categoryId], color: chatState.categoryTextColors[chatState.selectedChatInfo.categoryId] }} className={`py-1 px-2 rounded-md`}>{msg.question}</span>
                                </div>
                                <div className={`text-left py-3`} style={{ color: chatState.categoryTextColors[chatState.selectedChatInfo.categoryId] }}>
                                    {msg.answer}
                                </div>
                            </React.Fragment>
                        )) :
                            <React.Fragment>
                                <div className={`flex justify-center text-primary`}>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex justify-center'>
                                            <MdOutlineSpeakerNotesOff size={100} />
                                        </div>
                                        <span className='text-xl'>Please Select a Chat.</span>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <div className="flex items-center mt-4 w-full lg:w-[95%]">
                    <Input
                        className={`flex-1 py-[0.5rem] px-[0.5rem] text-primary border border-gray-300 rounded-lg focus:outline-none`}
                        text={newMessage}
                        placeholder={'Type a message'}
                        onChangeText={(e: any) => setNewMessage(e.target.value)}
                        onKeyPressHandler={(e: any) => handleEnterSendMessage(e)} />
                    <button
                        disabled={(loading || !(selectedChat))}
                        className={`bg-primary text-white ml-2 px-4 py-[0.71rem] rounded-lg border-y-1 border-primary ${(!selectedChat) && 'cursor-not-allowed'} ${(!loading) && 'hover:bg-blue-600'}`}
                        onClick={handleSendMessage}
                    >

                        {!loading ? <FaArrowUp size={20} /> : <svg className="animate-spin w-[20px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                    </button>
                </div>
            </div>
        </div>
    );
};
