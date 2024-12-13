"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import Loading from "@/src/components/Loading";
import { login, logout } from "@/src/lib/features/session/sessionSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/lib/store";

export default function AuthenticateWrapper() {
    return (
        <Suspense>
            <Authenticate />
        </Suspense>
    );
}

function Authenticate() {
    const { user, isInitialized, } = useStytchUser();
    const stytch = useStytch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const [loading, setLoading] = useState(false);

    const handleLogin = ({ username, token }: { username: string; token: string }) => {
        dispatch(
            login({
                username: username,
                token: token,
            })
        );
        router.replace("/dashboard");
        setLoading(false);
    }

    const handLogout = () => {
        dispatch(logout());
        router.replace("/login");
        setLoading(false);
    }

    const checkIfUserPresent = () => {
        const username = localStorage.getItem('userName');
        const token = localStorage.getItem('token');
        if (token && username && token.trim().length > 0 && username.trim().length > 0) {
            handleLogin({ username, token: token });
        } else {
            handLogout();
        }
    }

    const handleMagicLinksLogin = async (token: string) => {
        try {
            const result = await stytch.magicLinks.authenticate(token, {
                session_duration_minutes: 60,
            });
            handleLogin({
                token: result.session_jwt,
                username: result.user.name.first_name
            });
        } catch (error) {
            handLogout();
        }
    }

    const handleOAuthLogin = async (token: string) => {
        try {
            const result = await stytch.oauth.authenticate(token, {
                session_duration_minutes: 60,
            });
            handleLogin({
                token: result.session_jwt,
                username: result.user.name.first_name
            });
        } catch (error) {
            handLogout();
        }
    }

    useEffect(() => {
        setLoading(true);
        const authenticateUser = async () => {
            if (stytch && isInitialized) {
                if (!user) {
                    const tokenType = searchParams.get("stytch_token_type");
                    const token = searchParams.get("token");
                    if (token) {
                        if (tokenType === "magic_links") {
                            handleMagicLinksLogin(token);
                        }
                        if (tokenType === "oauth") {
                            handleOAuthLogin(token);
                        }
                    } else {
                        checkIfUserPresent();
                    }
                } else {
                    checkIfUserPresent();
                }
            } else {
                setTimeout(() => {
                    authenticateUser();
                }, 1000);
            }
        };

        authenticateUser();
    }, [isInitialized, searchParams, user]);

    return loading ? <Loading /> : null;
}
