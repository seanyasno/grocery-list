import React from 'react';

import { NextPage } from 'next';

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
import { Grid, Stack } from '@mui/material';

const Register: NextPage = () => {
    const title = 'צור חשבון חדש';
    const registerButtonLabel = 'הירשם';

    const { loading, error } = useAuthValidation();

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Background>
            <FormCard>
                <Stack width={'50%'} margin={'auto 0'}>
                    <Title>{title}</Title>
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

                    <SubmitButton variant={'contained'} color={'secondary'}>
                        {registerButtonLabel}
                    </SubmitButton>

                    <BottomSection
                        topLabel={'או הירשם עם'}
                        bottomLabel={'כבר יש לך חשבון?'}
                        bottomLinkLabel={'התחבר'}
                        href={'/login'}
                    >
                        <SocialButtons />
                    </BottomSection>
                </Stack>
            </FormCard>
        </Background>
    );
};

export default Register;
