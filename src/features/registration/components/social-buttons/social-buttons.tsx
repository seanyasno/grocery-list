import React from 'react';

import { FaApple, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { SocialIconButton } from '@/features/registration';
import { Stack } from '@mui/material';

export const SocialButtons: React.FC = () => {
    return (
        <Stack
            direction={'row'}
            spacing={3}
            justifyContent={'center'}
            textAlign={'center'}
        >
            <SocialIconButton size={'large'}>
                <FaFacebook color={'#1877F2'} />
            </SocialIconButton>
            <SocialIconButton size={'large'}>
                <FcGoogle />
            </SocialIconButton>
            <SocialIconButton size={'large'}>
                <FaApple color={'#000'} />
            </SocialIconButton>
        </Stack>
    );
};
