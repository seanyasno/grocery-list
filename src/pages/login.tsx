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
import { Button, Grid, Stack } from '@mui/material';

const Login: NextPage = () => {
    const title = 'התחברות';
    const loginButtonLabel = 'התחבר';

    return (
        <Background>
            <FormCard>
                <Stack width={'50%'} margin={'auto 0'}>
                    <Title>{title}</Title>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <FilledTextField
                                variant={'filled'}
                                label={'אימייל'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign={'right'}>
                            <FilledTextField
                                variant={'filled'}
                                label={'סיסמה'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                            <Button variant={'text'} sx={{ color: 'white' }}>
                                שכחת סיסמה?
                            </Button>
                        </Grid>
                    </Grid>

                    <SubmitButton variant={'contained'} color={'secondary'}>
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
    );
};

export default Login;
