import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { Footer, ResponsiveAppBar } from '@/components';
import { ShoppingCartProvider } from '@/contexts';
import { CheckoutList, LeftSection } from '@/features/checkout';
import { theme } from '@/styles/theme';
import { Grid } from '@mui/material';

const CheckoutPage: NextPage = () => {
    const pageTitle = 'דף קניות של אתר קניות';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <ShoppingCartProvider>
                <ResponsiveAppBar />
                <Grid
                    container
                    sx={{
                        height: '90vh',
                        padding: '40px',
                        overflowY: 'auto',
                        [theme.breakpoints.down('sm')]: {
                            padding: '20px',
                        },
                    }}
                    spacing={2}
                >
                    <Grid
                        item
                        xs
                        order={{
                            xs: 2,
                            md: 1,
                        }}
                    >
                        <CheckoutList />
                    </Grid>
                    <LeftSection />
                </Grid>
            </ShoppingCartProvider>
            <Footer />
        </>
    );
};

export default CheckoutPage;
