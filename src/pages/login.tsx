import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { auth } from '@/config';
import {
    Background,
    BottomSection,
    FilledTextField,
    FormCard,
    SocialButtons,
    SubmitButton,
    Title,
} from '@/features/registration';
import { useAuthValidation } from '@/hooks';
import { Button, Grid, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

type LoginInfo = {
    email: string;
    password: string;
};

const Login: NextPage = () => {
    const title = 'התחברות';
    const loginButtonLabel = 'התחבר';

    const { user, loading, error } = useAuthValidation();
    const [signInWithEmailAndPassword, loadingUser] =
        useSignInWithEmailAndPassword(auth);

    const { values, handleChange, handleSubmit, errors } = useFormik<LoginInfo>(
        {
            initialValues: {
                email: '',
                password: '',
            },
            onSubmit: ({ email, password }) =>
                signInWithEmailAndPassword(email, password),
            validate: ({ email, password }) => {
                const errors: Partial<LoginInfo> = {};

                if (!email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
                ) {
                    errors.email = 'Invalid email address';
                }

                if (!password) {
                    errors.password = 'Required';
                }

                return errors;
            },
        }
    );

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (loading || loadingUser) {
        return <p>Loading...</p>;
    }

    if (user) {
        return (
            <div>
                <p>Signed In User: {user.email}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <Background>
                <FormCard>
                    <Stack width={'50%'} margin={'auto 0'}>
                        <Title>{title}</Title>
                        <Grid container columnSpacing={2} rowSpacing={2}>
                            <Grid item xs={12}>
                                <FilledTextField
                                    name={'email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    variant={'filled'}
                                    label={'אימייל'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item xs={12} textAlign={'right'}>
                                <FilledTextField
                                    name={'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    type={'password'}
                                    variant={'filled'}
                                    label={'סיסמה'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                                <Button
                                    variant={'text'}
                                    sx={{ color: 'white' }}
                                >
                                    שכחת סיסמה?
                                </Button>
                            </Grid>
                        </Grid>

                        <SubmitButton
                            type={'submit'}
                            variant={'contained'}
                            color={'secondary'}
                        >
                            {loginButtonLabel}
                        </SubmitButton>

                        <BottomSection
                            topLabel={'או התחבר עם'}
                            bottomLabel={'אין לך חשבון?'}
                            bottomLinkLabel={'הירשם כעת'}
                            href={'/register'}
                        >
                            <SocialButtons />
                        </BottomSection>
                    </Stack>
                </FormCard>
            </Background>
        </form>
    );
};

export default Login;
