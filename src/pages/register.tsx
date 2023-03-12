import React from 'react';

import { NextPage } from 'next';

import { LoadingPage } from '@/components';
import { cities } from '@/constants/cities';
import {
    Background,
    BottomSection,
    FilledTextField,
    FormCard,
    SocialButtons,
    SubmitButton,
    Title,
} from '@/features/registration';
import { useRegisterForm } from '@/features/registration/hooks';
import { useAuthValidation } from '@/hooks';
import { theme } from '@/styles/theme';
import { Autocomplete, Grid, Stack } from '@mui/material';

const Register: NextPage = () => {
    const title = 'צור חשבון חדש';
    const registerButtonLabel = 'הירשם';

    const { loading, error, navigating } = useAuthValidation();
    const {
        values,
        handleChange,
        setFieldValue,
        handleSubmit,
        errors,
        isSubmitting,
    } = useRegisterForm();

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (loading || isSubmitting || navigating) {
        return <LoadingPage />;
    }

    return (
        <Background>
            <form onSubmit={handleSubmit}>
                <FormCard>
                    <Stack
                        display={{
                            xs: 'none',
                            md: 'flex',
                        }}
                        width={'50%'}
                        margin={'auto 0'}
                    >
                        <Title>{title}</Title>
                        <Grid container columnSpacing={2} rowSpacing={2}>
                            <Grid item xs={6}>
                                <FilledTextField
                                    name={'fullName'}
                                    value={values.fullName}
                                    onChange={handleChange}
                                    error={!!errors.fullName}
                                    variant={'filled'}
                                    label={'שם מלא'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    renderInput={(params) => (
                                        <FilledTextField
                                            ref={params.InputProps.ref}
                                            inputProps={params.inputProps}
                                            name={'city'}
                                            value={values.city}
                                            error={!!errors.city}
                                            variant={'filled'}
                                            label={'עיר מגורים'}
                                            fullWidth
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                        />
                                    )}
                                    noOptionsText={'לא נמצאו ערים'}
                                    options={cities.map((city) => city.name)}
                                    onChange={(event, value) => {
                                        setFieldValue('city', value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FilledTextField
                                    name={'street'}
                                    value={values.street}
                                    onChange={handleChange}
                                    error={!!errors.street}
                                    variant={'filled'}
                                    label={'רחוב'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FilledTextField
                                    name={'houseNumber'}
                                    value={values.houseNumber}
                                    onChange={handleChange}
                                    error={!!errors.houseNumber}
                                    variant={'filled'}
                                    label={'מספר בית'}
                                    type={'number'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FilledTextField
                                    name={'entrance'}
                                    value={values.entrance}
                                    onChange={handleChange}
                                    error={!!errors.entrance}
                                    variant={'filled'}
                                    label={'כניסה'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FilledTextField
                                    name={'phoneNumber'}
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    error={!!errors.phoneNumber}
                                    variant={'filled'}
                                    label={'טלפון'}
                                    type={'tel'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FilledTextField
                                    name={'email'}
                                    value={values.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    variant={'filled'}
                                    label={'אימייל'}
                                    type={'email'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FilledTextField
                                    name={'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    variant={'filled'}
                                    label={'סיסמה'}
                                    type={'password'}
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                        </Grid>

                        <SubmitButton
                            type={'submit'}
                            variant={'contained'}
                            color={'secondary'}
                        >
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

                <Stack
                    display={{
                        xs: 'flex',
                        md: 'none',
                    }}
                    width={'100%'}
                    padding={'40px 20px'}
                >
                    <Title>{title}</Title>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={12} md={6}>
                            <FilledTextField
                                name={'fullName'}
                                value={values.fullName}
                                onChange={handleChange}
                                error={!!errors.fullName}
                                variant={'filled'}
                                label={'שם מלא'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                renderInput={(params) => (
                                    <FilledTextField
                                        name={'city'}
                                        value={values.city}
                                        onChange={handleChange}
                                        error={!!errors.city}
                                        ref={params.InputProps.ref}
                                        inputProps={params.inputProps}
                                        variant={'filled'}
                                        label={'עיר מגורים'}
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                )}
                                noOptionsText={'לא נמצאו ערים'}
                                options={cities.map((city) => city.name)}
                                onChange={(event, value) => {
                                    setFieldValue('city', value);
                                }}
                                value={values.city}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                name={'street'}
                                value={values.street}
                                onChange={handleChange}
                                error={!!errors.street}
                                variant={'filled'}
                                label={'רחוב'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledTextField
                                name={'houseNumber'}
                                value={values.houseNumber}
                                onChange={handleChange}
                                error={!!errors.houseNumber}
                                variant={'filled'}
                                label={'מספר בית'}
                                type={'number'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FilledTextField
                                name={'entrance'}
                                value={values.entrance}
                                onChange={handleChange}
                                error={!!errors.entrance}
                                variant={'filled'}
                                label={'כניסה'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FilledTextField
                                name={'phoneNumber'}
                                value={values.phoneNumber}
                                onChange={handleChange}
                                error={!!errors.phoneNumber}
                                variant={'filled'}
                                label={'טלפון'}
                                type={'tel'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FilledTextField
                                name={'email'}
                                value={values.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                variant={'filled'}
                                label={'אימייל'}
                                type={'email'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FilledTextField
                                name={'password'}
                                value={values.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                variant={'filled'}
                                label={'סיסמה'}
                                type={'password'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Grid>
                    </Grid>

                    <SubmitButton
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                    >
                        {registerButtonLabel}
                    </SubmitButton>

                    <BottomSection
                        topLabel={'או הירשם עם'}
                        bottomLabel={'כבר יש לך חשבון?'}
                        bottomLinkLabel={'התחבר'}
                        href={'/login'}
                        labelColor={'white'}
                        bottomLinkColor={theme.palette.primary.main}
                    >
                        <SocialButtons />
                    </BottomSection>
                </Stack>
            </form>
        </Background>
    );
};

export default Register;
