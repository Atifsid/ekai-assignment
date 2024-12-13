"use client";
import { ReactNode } from "react"
import { StytchProvider } from '@stytch/nextjs';
import { createStytchUIClient } from '@stytch/nextjs/ui';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

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
    process.env.STYTCH_PUBLIC_TOKEN ?? '',
    stytchOptions
);

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <StytchProvider stytch={stytchClient}>
                <Provider store={store}>
                    {children}
                </Provider>
            </StytchProvider>
        </main>
    )
}