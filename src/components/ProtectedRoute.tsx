import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../lib/store';
import Loading from './Loading';
import { login } from '../lib/features/session/sessionSlice';

const ProtectedRoute = ({ children }: any) => {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // instead of this next js' middleware must be used.
        // get token from NextRequest or check if it's a unauthorized req
        // then navigate to login else dashboard.
        setUserName(null);
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('userName');
        if (token?.trim() != '' && username?.trim() != '') {
            setUserName(username);
            dispatch(login({ token, username }))
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, [router]);

    if (!userName) {
        return <div><Loading /> </div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;