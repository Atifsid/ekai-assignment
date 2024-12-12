import { useDroppable } from "@dnd-kit/core";
import { categoryColors } from "../helpers/constants/chats";

export const CategoryDroppable = ({ categoryId, children }: { categoryId: string; children: React.ReactNode }) => {
    const { setNodeRef } = useDroppable({ id: categoryId });
    const categoryColor = categoryColors[categoryId];

    return (
        <div ref={setNodeRef} className={`category p-2 mb-4 bg-gray-800 rounded min-h-[150px]`}>
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className="font-bold text-white">{categoryId}</div>
                <div className={`w-4 h-4 ${categoryColor} rounded-full`}></div>
            </div>
            {children}
        </div>
    );
};