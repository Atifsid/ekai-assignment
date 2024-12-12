"use client";
import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <h1>Dashboard</h1>
        </ProtectedRoute>
    )
}