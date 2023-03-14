import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { LoadingPage } from '@/components';
import {
    Background,
    BottomSection,
    FilledTextField,
    FormCard,
    SocialButtons,
    SubmitButton,
    Title,
} from '@/features/registration';
import { useLoginForm } from '@/features/registration/hooks';
import { useAuthValidation } from '@/hooks';
import { theme } from '@/styles/theme';
import { Button, Grid, Stack } from '@mui/material';

const Login: NextPage = () => {
    const pageTitle = 'דף התחברות של אתר קניות';
    const title = 'התחברות';
    const loginButtonLabel = 'התחבר';
    const forgotPasswordButtonLabel = 'שכחת סיסמה?';
    const emailLabel = 'אימייל';
    const passwordLabel = 'סיסמה';

    const { loading, error } = useAuthValidation();
    const { values, handleChange, handleSubmit, errors } = useLoginForm();

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <form onSubmit={handleSubmit}>
                <Background>
                    <FormCard>
                        <Stack
                            display={{
                                xs: 'none',
                                md: 'flex',
                            }}
                            width={'50%'}
                            margin={'auto 0'}
                        >
                            <Title variant={'h1'}>{title}</Title>
                            <Grid container columnSpacing={2} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <FilledTextField
                                        id={'email-field'}
                                        name={'email'}
                                        value={values.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        variant={'filled'}
                                        label={emailLabel}
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12} textAlign={'right'}>
                                    <FilledTextField
                                        id={'password-field'}
                                        name={'password'}
                                        value={values.password}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        type={'password'}
                                        variant={'filled'}
                                        label={passwordLabel}
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                        helperText={errors.password}
                                    />
                                    <Button
                                        variant={'text'}
                                        sx={{ color: 'white' }}
                                    >
                                        {forgotPasswordButtonLabel}
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

                    <Stack
                        display={{
                            xs: 'flex',
                            md: 'none',
                        }}
                        width={'100%'}
                        padding={'40px 20px'}
                    >
                        <Title variant={'h1'}>{title}</Title>
                        <Grid container columnSpacing={2} rowSpacing={2}>
                            <Grid item xs={12}>
                                <FilledTextField
                                    id={'email-mobile-field'}
                                    name={'email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    variant={'filled'}
                                    label={emailLabel}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} textAlign={'right'}>
                                <FilledTextField
                                    id={'password-mobile-field'}
                                    name={'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    type={'password'}
                                    variant={'filled'}
                                    label={passwordLabel}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                    helperText={errors.password}
                                />
                                <Button
                                    variant={'text'}
                                    sx={{ color: 'white' }}
                                >
                                    {forgotPasswordButtonLabel}
                                </Button>
                            </Grid>
                        </Grid>

                        <SubmitButton
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            sx={{
                                color: 'white',
                            }}
                        >
                            {loginButtonLabel}
                        </SubmitButton>

                        <BottomSection
                            topLabel={'או התחבר עם'}
                            bottomLabel={'אין לך חשבון?'}
                            bottomLinkLabel={'הירשם כעת'}
                            href={'/register'}
                            labelColor={'white'}
                            bottomLinkColor={theme.palette.primary.main}
                        >
                            <SocialButtons />
                        </BottomSection>
                    </Stack>
                </Background>
            </form>
        </>
    );
};

export default Login;
