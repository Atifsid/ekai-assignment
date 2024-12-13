import { useDroppable } from "@dnd-kit/core";
import { MdDeleteForever } from "react-icons/md";
import { AppDispatch, RootState } from "../lib/store";
import { useDispatch, useSelector } from "react-redux";
import { removeCategory, updateCategoryBgColor } from "../lib/features/chat/chatSlice";
import { useRef } from "react";

export const CategoryDroppable = ({ categoryId, children }: { categoryId: string; children: React.ReactNode }) => {
    const { setNodeRef } = useDroppable({ id: categoryId });
    const chatState = useSelector((state: RootState) => state.chat)
    const dispatch = useDispatch<AppDispatch>();
    const colorInputRef = useRef<HTMLInputElement>(null);

    const onDeleteCategory = () => {
        dispatch(removeCategory({ categoryIdToRemove: categoryId }));
    }

    const toggleColorPicker = () => {
        if (colorInputRef) {
            colorInputRef.current?.click();
        }
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCategoryBgColor({ categoryId, colorHex: e.target.value }))
    }

    return (
        <div ref={setNodeRef} className={`category p-2 mb-4 bg-gray-800 rounded min-h-[150px]`}>
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className="font-bold text-white w-full truncate overflow-hidden whitespace-nowrap cursor-pointer" title={categoryId}>{categoryId}</div>
                <span className="flex items-center gap-1">
                    <input
                        className="absolute opacity-0 pointer-events-none -z-1"
                        ref={colorInputRef}
                        type="color"
                        defaultValue={chatState.categoryBgColors[categoryId]}
                        onChange={handleColorChange}
                    />
                    <div
                        style={{ backgroundColor: chatState.categoryBgColors[categoryId] }}
                        className={`w-5 h-5 rounded-full cursor-pointer`}
                        onClick={toggleColorPicker}
                    ></div>
                    <MdDeleteForever className="text-delete cursor-pointer" size={24} onClick={onDeleteCategory} />
                </span>
            </div>
            {children}
        </div>
    );
};