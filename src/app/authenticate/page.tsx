"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import Loading from "@/src/components/Loading";
import { login, logout } from "@/src/lib/features/session/sessionSlice";
import { AppDispatch } from "../../lib/store";
import { useDispatch } from "react-redux";

export default function AuthenticateWrapper() {
    return (
        <Suspense>
            <Authenticate />
        </Suspense>
    );
}

function Authenticate() {
    const { user, isInitialized } = useStytchUser();
    const stytch = useStytch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authenticateUser = async () => {
            if (stytch && !user && isInitialized) {
                const tokenType = searchParams.get("stytch_token_type");
                const token = searchParams.get("token");
                if (token && tokenType === "magic_links") {
                    try {
                        await stytch.magicLinks.authenticate(token, {
                            session_duration_minutes: 60,
                        });
                    } catch (err) {
                        console.error("Authentication failed:", err);
                    }
                }
            }
        };

        authenticateUser();
    }, [isInitialized, stytch, searchParams]);

    useEffect(() => {
        if (isInitialized) {
            if (user) {
                dispatch(
                    login({
                        username: `${user.name.first_name} ${user.name.last_name}`,
                        token: user.user_id,
                    })
                );
                router.replace("/dashboard");
            } else {
                dispatch(logout());
                router.replace("/login");
            }
            setLoading(false);
        }
    }, [user, isInitialized, dispatch, router]);

    return loading ? <Loading /> : null;
}
