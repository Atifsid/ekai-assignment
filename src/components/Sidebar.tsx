import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../lib/store';
import { addCategory, addChat, moveChatToCategory, updateSelectedChat } from '../lib/features/chat/chatSlice';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DraggableChat } from './DraggableChat';
import { CategoryDroppable } from './CategoryDroppable';
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from './Button';
import { Input } from './Input';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const chatState = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch<AppDispatch>();
    const [isSaveNewCategoryVisible, setSaveNewCategoryVisible] = useState(false);
    const [newCategory, setNewCategory] = useState<string>('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [userName, setUserName] = useState('');

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;
        const endTime = new Date().getTime();
        const timeTaken = endTime - (startTime ?? endTime);

        if (over) {
            const categoryId = over.id.toString();
            const chatId = active.id.toString();

            if (timeTaken < 300) {
                dispatch(updateSelectedChat({ chatId, categoryId }));
            } else {
                if (over && active.id !== over.id) {
                    dispatch(moveChatToCategory({ chatId, categoryId }));
                }
            }
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

    const onAddNewChat = (categoryId: string) => {
        dispatch(addChat({ categoryId: categoryId }));
    }

    const handleDragStart = (e: DragStartEvent) => {
        setStartTime(new Date().getTime());
    }

    useEffect(() => {
        if (localStorage) {
            setUserName(localStorage.getItem('userName') ?? 'Mock Name');
        }
    }, [])

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} >
            <div
                className={`fixed md:static z-30 bg-primary text-white p-4 h-screen transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    } md:w-[260px] w-48 overflow-y-auto`}
            >
                <button
                    className="md:hidden absolute top-4 right-4 text-white"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>

                <h1 className="text-xl font-bold mb-2 text-wrap">{`Hi ${userName}`}</h1>

                <div className='mb-4'>
                    {!isSaveNewCategoryVisible && <Button className={'w-full px-[0.4rem] py-[0.4rem]'} icon={<TbCategoryPlus size={24} />} text={'New Category'} click={onAddNewCategory} />}

                    {isSaveNewCategoryVisible &&
                        <div>
                            <Input
                                className='flex-1 px-[0.4rem] py-[0.2rem] text-primary border border-gray-300 rounded-md focus:outline-none'
                                text={newCategory}
                                placeholder={'Enter New Category'}
                                onChangeText={(e: any) => setNewCategory(e.target.value)} />
                            <div className='flex flex-col gap-3 mt-4'>
                                <Button className='px-[0.4rem] py-[0.4rem]' icon={<MdOutlineDataSaverOn size={24} />} text={'Save'} click={onSaveClicked} />
                                <Button className='px-[0.4rem] py-[0.4rem]' icon={<MdCancel size={24} />} text={'Cancel'} click={onCancelClicked} />
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
                            <Button
                                className='w-full px-[0.4rem] py-[0.4rem]'
                                icon={<IoIosAddCircle size={24} />}
                                text={'New Chat'}
                                click={() => onAddNewChat(categoryId)} />
                        </CategoryDroppable>
                    );
                })}
            </div>
        </DndContext>
    );
};
