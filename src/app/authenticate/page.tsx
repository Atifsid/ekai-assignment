"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useStytch, useStytchUser } from "@stytch/nextjs";
import Loading from "@/src/components/Loading";

export default function Authenticate() {
    const { user, isInitialized } = useStytchUser();
    const stytch = useStytch();
    const router = useRouter();
    const searchParams = useSearchParams()

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
            router.replace("/dashboard");
        } else {
            router.replace("/login");
        }
    }, [user, isInitialized, router]);

    return <Loading />

}