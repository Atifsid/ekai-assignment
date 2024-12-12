import React from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../lib/store';
import { moveChatToCategory } from '../lib/features/chat/chatSlice';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DraggableChat } from './DraggableChat';
import { CategoryDroppable } from './CategoryDroppable';
import { IoIosAddCircle } from "react-icons/io";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const session = useSelector((state: RootState) => state.session);
    const chatState = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch<AppDispatch>();

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;
        if (over && active.id !== over.id) {
            const categoryId = over.id.toString();
            const chatId = active.id.toString();

            dispatch(moveChatToCategory({ chatId, categoryId }));
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div
                className={`fixed md:static z-30 bg-primary text-white p-4 h-screen transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    } md:w-60 w-48 overflow-auto`}
            >
                <button
                    className="md:hidden absolute top-4 right-4 text-white"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>

                <h1 className="text-xl font-bold mb-2 text-wrap">{`Hi ${session.user?.username}`}</h1>

                <button className='bg-white text-black mb-4 rounded-md font-bold px-2 py-1 w-full'>
                    <span className='flex items-center gap-2'>
                        <IoIosAddCircle size={24} />
                        New Chat
                    </span>
                </button>

                {Object.keys(chatState.categories).map((categoryId) => {
                    const categoryChats = chatState.categories[categoryId];

                    return (
                        <CategoryDroppable key={categoryId} categoryId={categoryId}>
                            {categoryChats.map((chat, idx) => (
                                <DraggableChat key={chat.id} chat={chat} idx={idx} />
                            ))}
                        </CategoryDroppable>
                    );
                })}
            </div>
        </DndContext>
    );
};
