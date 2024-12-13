import { useDroppable } from "@dnd-kit/core";
import { categoryColors } from "../helpers/constants/chats";
import { MdDeleteForever } from "react-icons/md";
import { AppDispatch } from "../lib/store";
import { useDispatch } from "react-redux";
import { removeCategory } from "../lib/features/chat/chatSlice";

export const CategoryDroppable = ({ categoryId, children }: { categoryId: string; children: React.ReactNode }) => {
    const { setNodeRef } = useDroppable({ id: categoryId });
    const categoryColor = categoryColors[categoryId];
    const dispatch = useDispatch<AppDispatch>();

    const onDeleteCategory = () => {
        dispatch(removeCategory({ categoryIdToRemove: categoryId }));
    }

    return (
        <div ref={setNodeRef} className={`category p-2 mb-4 bg-gray-800 rounded min-h-[150px]`}>
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className="font-bold text-white">{categoryId}</div>
                <span className="flex items-center gap-1">
                    <div className={`w-4 h-4 ${categoryColor} rounded-full`}></div>
                    <MdDeleteForever className="text-delete cursor-pointer" size={24} onClick={onDeleteCategory} />
                </span>
            </div>
            {children}
        </div>
    );
};