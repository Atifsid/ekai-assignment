"use client";
import { Avatar } from "@/src/components/Avatar";
import { Chat } from "@/src/components/Chat";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { Sidebar } from "@/src/components/Sidebar";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ProtectedRoute>
            <section className="flex flex-col md:flex-row h-screen bg-gray-100">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col relative">
                    <button
                        className="md:hidden absolute top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <MdEditSquare />
                    </button>
                    {/* <Avatar /> */}
                    <Chat />
                </div>
            </section>
        </ProtectedRoute>
    )
}