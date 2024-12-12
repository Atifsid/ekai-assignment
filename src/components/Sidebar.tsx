import React from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../lib/store';
import { updateSelectedChatIdx } from '../lib/features/chat/chatSlice';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const session = useSelector((state: RootState) => state.session);
    const chatState = useSelector((state: RootState) => state.chat)
    const dispatch = useDispatch<AppDispatch>();

    const onChatTitleClick = (idx: number) => {
        dispatch(updateSelectedChatIdx({ newIndex: idx }));
        onClose();
    }

    return (
        <div
            className={`fixed md:static z-30 bg-primary text-white p-4 h-screen transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                } md:w-60 w-48`}
        >
            <button
                className="md:hidden absolute top-4 right-4 text-white"
                onClick={onClose}
            >
                <FiX size={24} />
            </button>

            <h1 className="text-xl font-bold mb-2 text-wrap">{`Hi ${session.user?.username}`}</h1>
            <ul>
                {chatState.chats.map((chat, idx) => (
                    <li key={`${chat.title}-${idx}`} className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => onChatTitleClick(idx)}>{chat.title}</li>
                ))}
            </ul>
        </div>
    );
};
