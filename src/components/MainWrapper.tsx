"use client";
import { ReactNode } from "react"
import { StytchProvider } from '@stytch/nextjs';
import { createStytchUIClient } from '@stytch/nextjs/ui';

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

export const MainWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <StytchProvider stytch={stytchClient}>
                {children}
            </StytchProvider>
        </main>
    )
}