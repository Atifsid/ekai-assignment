"use client";
import { StytchLogin } from '@stytch/nextjs';
import { Products, StytchLoginConfig } from '@stytch/vanilla-js';
import useIsLargeScreen from '../../helpers/hooks/useIsLargeScreen';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/src/lib/store';
import { useDispatch } from 'react-redux';
import { login } from '@/src/lib/features/session/sessionSlice';

export default function Login() {
    const { isLargeScreen } = useIsLargeScreen();
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const styles = {
        container: {
            width: `${isLargeScreen ? '30vw' : '90vw'}`,
        },
    };

    const config: StytchLoginConfig = {
        products: [Products.emailMagicLinks, Products.oauth],
        emailMagicLinksOptions: {
            loginRedirectURL: process.env.REDIRECT_URL,
            loginExpirationMinutes: 60,
            signupRedirectURL: process.env.REDIRECT_URL,
            signupExpirationMinutes: 60,
        },
        oauthOptions: {
            providers: [{
                type: 'google'
            }]
        }
    };

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetail');
        if (userDetails && userDetails != '') {
            setUserDetails(userDetails);
            const parsedUserDetails = JSON.parse(JSON.stringify(userDetails));
            dispatch(login(parsedUserDetails))
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <StytchLogin config={config} styles={styles} />
        </div>
    );
}