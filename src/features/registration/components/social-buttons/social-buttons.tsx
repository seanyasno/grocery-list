import React from 'react';

import { FaApple, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { auth, firestore } from '@/config';
import { SocialIconButton } from '@/features/registration';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

export const SocialButtons: React.FC = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    return (
        <Stack
            direction={'row'}
            spacing={3}
            justifyContent={'center'}
            textAlign={'center'}
        >
            <SocialIconButton
                size={'large'}
                aria-label={'login with facebook button'}
            >
                <FaFacebook color={'#1877F2'} />
            </SocialIconButton>
            <SocialIconButton
                size={'large'}
                aria-label={'login with google button'}
                onClick={async () => {
                    try {
                        const user = await signInWithGoogle();
                        const data = await getDoc(
                            doc(firestore, 'users', user?.user?.uid)
                        );
                        if (isEmpty(data.data()) && !isEmpty(user?.user?.uid)) {
                            await setDoc(
                                doc(firestore, 'users', user.user.uid),
                                {
                                    email: user?.user?.email,
                                    fullName: user?.user?.displayName,
                                    favoriteGroceries: [],
                                    phone: user?.user?.phoneNumber,
                                    city: 'ראשון לציון',
                                }
                            );
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                <FcGoogle />
            </SocialIconButton>
            <SocialIconButton
                size={'large'}
                aria-label={'login with apple button'}
            >
                <FaApple color={'#000'} />
            </SocialIconButton>
        </Stack>
    );
};
