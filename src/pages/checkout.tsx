import React from 'react';

import { NextPage } from 'next';

import { Footer, ResponsiveAppBar } from '@/components';
import { ShoppingCartProvider } from '@/contexts';
import { CheckoutList, OrderSummary } from '@/features/checkout';
import { theme } from '@/styles/theme';
import { Grid } from '@mui/material';

const CheckoutPage: NextPage = () => {
    return (
        <div>
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
                    <Grid
                        item
                        maxWidth={'433px'}
                        width={'100%'}
                        order={{
                            xs: 1,
                            md: 2,
                        }}
                    >
                        <OrderSummary vatRate={17} />
                    </Grid>
                </Grid>
            </ShoppingCartProvider>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
