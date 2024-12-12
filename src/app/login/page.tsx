import { StytchLogin } from '@stytch/nextjs';
import { Products, StytchLoginConfig } from '@stytch/vanilla-js';
import useIsLargeScreen from '../../helpers/hooks/useIsLargeScreen';

export const Login = () => {
    const { isLargeScreen } = useIsLargeScreen();

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

    return <StytchLogin config={config} styles={styles} />;
}