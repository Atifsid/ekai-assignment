"use client";
import { StytchLogin } from "@stytch/nextjs";
import { Products, StytchLoginConfig } from "@stytch/vanilla-js";
import useIsLargeScreen from "../../helpers/hooks/useIsLargeScreen";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/src/lib/store";
import { useDispatch } from "react-redux";
import { login } from "@/src/lib/features/session/sessionSlice";
import Loading from "@/src/components/Loading";

export default function Login() {
    const { isLargeScreen } = useIsLargeScreen();
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const styles = {
        container: {
            width: `${isLargeScreen ? "30vw" : "90vw"}`,
        },
    };

    const config: StytchLoginConfig = {
        products: [Products.emailMagicLinks, Products.oauth],
        emailMagicLinksOptions: {
            loginRedirectURL: process.env.NEXT_PUBLIC_REDIRECT_URL,
            loginExpirationMinutes: 60,
            signupRedirectURL: process.env.NEXT_PUBLIC_REDIRECT_URL,
            signupExpirationMinutes: 60,
        },
        oauthOptions: {
            providers: [{ type: "google" }],
        },
    };

    useEffect(() => {
        const authenticate = async () => {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("userName");

            if (token?.trim()) {
                dispatch(login({ token, username }));
                router.replace("/dashboard");
            } else if (pathname !== "/login") {
                router.replace("/login");
            }

            setIsAuthenticating(false);
        };

        authenticate();
    }, [dispatch, router, pathname]);

    if (isAuthenticating) {
        return <Loading />;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <StytchLogin config={config} styles={styles} />
        </div>
    );
}
