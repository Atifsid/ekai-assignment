"use client";
import { Chat } from "@/src/components/Chat";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { Sidebar } from "@/src/components/Sidebar";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { AppDispatch } from "@/src/lib/store";
import { useAppDispatch } from "@/src/helpers/hooks/storeHooks";
import { logout } from "@/src/lib/features/session/sessionSlice";
import { useRouter } from "next/navigation";
import { useStytch } from "@stytch/nextjs";

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useAppDispatch<AppDispatch>();
    const router = useRouter();
    const stytch = useStytch();

    const onLogout = () => {
        dispatch(logout());
        router.replace("/login");
        stytch.session.revoke();
    }

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

                    <button
                        className="absolute top-4 right-4 z-20 bg-gray-800 text-white p-2 rounded"
                        onClick={onLogout}
                    >
                        <IoLogOut />
                    </button>
                    {/* <Avatar /> */}
                    <Chat />
                </div>
            </section>
        </ProtectedRoute>
    )
}