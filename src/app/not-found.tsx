'use client';
import Loading from "../components/Loading";
import ProtectedRoute from "../components/ProtectedRoute";

export default function NotFoundPage() {
    return (
        <ProtectedRoute children={<Loading />} />
    )
}