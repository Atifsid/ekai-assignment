"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useStytch, useStytchUser } from "@stytch/nextjs";
import Loading from "@/src/components/Loading";
import { AppDispatch } from "@/src/lib/store";
import { useDispatch } from "react-redux";
import { login, logout } from "@/src/lib/features/session/sessionSlice";

export default function Authenticate() {
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
            const userDetail = { user: { username: `${user.name.first_name} ${user.name.last_name}`, email: user.emails[0].email }, token: user.user_id }
            localStorage.setItem('userDetail', JSON.stringify(userDetail));
            dispatch(login(userDetail))
            router.replace("/dashboard");
        } else {
            localStorage.removeItem('userDetail');
            dispatch(logout());
            router.replace("/login");
        }
    }, [user, isInitialized, router]);

    return <Loading />
}