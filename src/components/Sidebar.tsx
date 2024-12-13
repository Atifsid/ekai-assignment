import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../lib/store';
import { addCategory, moveChatToCategory } from '../lib/features/chat/chatSlice';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DraggableChat } from './DraggableChat';
import { CategoryDroppable } from './CategoryDroppable';
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { MdCancel } from "react-icons/md";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const session = useSelector((state: RootState) => state.session);
    const chatState = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch<AppDispatch>();
    const [isSaveNewCategoryVisible, setSaveNewCategoryVisible] = useState(false);
    const [newCategory, setNewCategory] = useState<string>('');

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;
        if (over && active.id !== over.id) {
            const categoryId = over.id.toString();
            const chatId = active.id.toString();

            dispatch(moveChatToCategory({ chatId, categoryId }));
        }
    };

    const onAddNewCategory = () => {
        setSaveNewCategoryVisible(true);
    }

    const onCancelClicked = () => {
        setNewCategory('');
        setSaveNewCategoryVisible(false);
    };

    const onSaveClicked = () => {
        if (newCategory.trim().length > 0) {
            dispatch(addCategory({ newCategoryId: newCategory }));
            onCancelClicked();
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div
                className={`fixed md:static z-30 bg-primary text-white p-4 h-screen transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    } md:w-[260px] w-48 overflow-auto`}
            >
                <button
                    className="md:hidden absolute top-4 right-4 text-white"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>

                <h1 className="text-xl font-bold mb-2 text-wrap">{`Hi ${session.user?.username}`}</h1>

                <div className='mb-4'>
                    {!isSaveNewCategoryVisible && <button className='bg-white text-primary rounded-md font-bold px-2 py-1 w-full' onClick={onAddNewCategory}>
                        <span className='flex items-center gap-2'>
                            <TbCategoryPlus size={24} />
                            New Category
                        </span>
                    </button>}

                    {isSaveNewCategoryVisible &&
                        <div>
                            <input
                                type="text"
                                className="flex-1 px-[0.4rem] py-[0.2rem] text-primary border border-gray-300 rounded-md focus:outline-none"
                                placeholder="Enter New Category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <div className='flex flex-col gap-3 mt-4'>
                                <button className='bg-white text-primary rounded-md font-bold px-[0.4rem] py-[0.1rem]' onClick={onSaveClicked}>
                                    <span className='flex items-center gap-2'>
                                        <MdOutlineDataSaverOn size={24} />
                                        Save
                                    </span>
                                </button>
                                <button className='bg-white text-primary rounded-md font-bold px-[0.4rem] py-[0.1rem]' onClick={onCancelClicked}>
                                    <span className='flex items-center gap-2'>
                                        <MdCancel size={24} />
                                        Cancel
                                    </span>
                                </button>
                            </div>
                        </div>}
                </div>

                {Object.keys(chatState.categories).map((categoryId) => {
                    const categoryChats = chatState.categories[categoryId];

                    return (
                        <CategoryDroppable key={categoryId} categoryId={categoryId}>
                            {categoryChats.map((chat, idx) => (
                                <DraggableChat key={chat.id} chat={chat} />
                            ))}
                        </CategoryDroppable>
                    );
                })}
            </div>
        </DndContext>
    );
};
