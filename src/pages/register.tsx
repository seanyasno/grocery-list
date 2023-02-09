import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import { FaApple, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import styled from '@emotion/styled';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #232f3e;
    padding: 54px 117px;
`;

const Card = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
            270deg,
            #ff9a00 44.92%,
            rgba(255, 154, 0, 0.68) 100%
        ),
        url('/images/karsten-winegeart-4bC1Ef88OYI-unsplash 1.webp');
    border-radius: 30px;
    background-repeat: no-repeat;
    padding: 50px 62px;
`;

const CardLayer = styled.div`
    background: linear-gradient(
        90deg,
        #ff9a00 44.92%,
        rgba(255, 154, 0, 0.68) 100%
    );
    position: absolute;
    width: 100%;
    height: 100%;
`;

const FilledTextField = styled(TextField)`
    & .MuiInputBase-root,
    .MuiInputBase-root.Mui-focused {
        background-color: #feb74a;
        color: #fff;
        font-size: 16px;
        border-radius: 6px;
        border-bottom: none;
    }

    & .MuiInputLabel-root,
    .MuiInputLabel-root.Mui-focused {
        color: #232f3e;
    }

    & .MuiInputLabel-shrink {
        font-size: 18px;
    }
`;

const SocialIconButton = styled(IconButton)`
    background-color: #fff;
    border: 1px solid #e0e0e9;
    box-shadow: 0px 18px 30px rgba(131, 119, 198, 0.11);
    border-radius: 15px;
`;

const Register: NextPage = () => {
    const title = 'צור חשבון חדש';
    const registerButtonLabel = 'הירשם';

    return (
        <Background>
            <Card>
                <Stack width={'50%'}>
                    <Typography
                        color={'#fff'}
                        fontSize={'44px'}
                        marginBottom={'18px'}
                    >
                        {title}
                    </Typography>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={6}>
                            <FilledTextField
                                variant={'filled'}
                                label={'שם מלא'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                variant={'filled'}
                                label={'עיר מגורים'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                variant={'filled'}
                                label={'רחוב'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                variant={'filled'}
                                label={'מספר בית'}
                                type={'number'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                variant={'filled'}
                                label={'כניסה'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                variant={'filled'}
                                label={'טלפון'}
                                type={'tel'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                variant={'filled'}
                                label={'אימייל'}
                                type={'email'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                variant={'filled'}
                                label={'סיסמה'}
                                type={'password'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        sx={{
                            margin: '38px 0',
                            fontSize: '22px',
                            padding: '10px 0',
                        }}
                    >
                        {registerButtonLabel}
                    </Button>

                    <Stack textAlign={'center'} spacing={3}>
                        <Typography>או התחבר עם</Typography>

                        <Stack
                            direction={'row'}
                            spacing={2}
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

                        <Box
                            sx={{
                                columnGap: '2px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                display={'inline'}
                                sx={{ textDecoration: 'none' }}
                            >
                                כבר יש לך חשבון?
                            </Typography>
                            <Link
                                href={'/login'}
                                style={{
                                    color: '#232F3E',
                                }}
                            >
                                <Typography display={'inline'}>
                                    התחבר
                                </Typography>
                            </Link>
                        </Box>
                    </Stack>
                </Stack>
            </Card>
        </Background>
    );
};

export default Register;
