import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../lib/store";
import Loading from "./Loading";
import { login } from "../lib/features/session/sessionSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("userName");

            if (token?.trim() && username?.trim()) {
                dispatch(login({ token, username }));
                router.replace("/dashboard");
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.replace("/login");
            }
        };

        checkAuthentication();
    }, [dispatch, router]);

    if (isAuthenticated === null) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
