import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../lib/store';
import Loading from './Loading';
import { login } from '../lib/features/session/sessionSlice';

const ProtectedRoute = ({ children }: any) => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

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

    if (!userDetails) {
        return <div><Loading /> </div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;