import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { auth } from '@/config';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useAuthValidation = () => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/');
        }
    }, [user, router]);

    return { user, loading, error };
};
