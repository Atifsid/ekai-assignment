"use client";
import { ReactNode, useEffect, useRef } from "react"
import { StytchProvider } from '@stytch/nextjs';
import { createStytchUIClient } from '@stytch/nextjs/ui';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from "../lib/store";
import { initializeSession } from "../lib/features/session/sessionSlice";

const stytchOptions = {
    cookieOptions: {
        opaqueTokenCookieName: "stytch_session",
        jwtCookieName: "stytch_session_jwt",
        path: "",
        availableToSubdomains: false,
        domain: "",
    }
}

const stytchClient = createStytchUIClient(
    process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN ?? '',
    stytchOptions
);

export const Providers = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>(null);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {
        if (localStorage === undefined) {
            setTimeout(() => {
                storeRef.current?.dispatch(initializeSession())
            }, 1000);
        }
    }, [children])

    return (
        <main>
            <StytchProvider stytch={stytchClient}>
                <Provider store={storeRef.current}>
                    {children}
                </Provider>
            </StytchProvider>
        </main>
    )
}