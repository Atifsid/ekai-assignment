import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Chat } from '../helpers/model/Chat';

export const DraggableChat = ({ chat }: { chat: Chat; }) => {
    const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({ id: chat.id });

    return (
        <ul
            style={{ transform: CSS.Translate.toString(transform), }}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded bg-gray-600 ${isDragging ? 'opacity-50 bg-gray-400' : ''}`}
        >
            <div className='flex justify-between items-center'>
                <span>{chat.title}</span>
            </div>
        </ul>
    );
};