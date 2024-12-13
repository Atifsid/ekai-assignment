"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
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

    useEffect(() => {
        if (stytch && !user && isInitialized) {
            const tokenType = searchParams.get('stytch_token_type');
            const token = searchParams.get('token');
            if (token && tokenType && tokenType === 'magic_links' && typeof (token) == 'string') {
                stytch.magicLinks.authenticate(token, {
                    session_duration_minutes: 60,
                });
            }
        }
    }, [isInitialized, router, stytch, user]);

    useEffect(() => {
        if (isInitialized && user) {
            // store user details in local storge to show in dashbord.
            // in real world scenario, an API will get these details.
            dispatch(login({ username: `${user.name.first_name} ${user.name.last_name}`, token: user.user_id }))
            router.replace("/dashboard");
        } else {
            dispatch(logout());
            router.replace("/login");
        }
    }, [user, isInitialized, router]);

    return <Loading />
}