import React from 'react';

import { NextPage } from 'next';

import { Footer, ResponsiveAppBar } from '@/components';
import { ShoppingCartProvider } from '@/contexts';
import { CheckoutList, OrderSummary } from '@/features/checkout';
import { Box, Grid } from '@mui/material';

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
                    }}
                    columnSpacing={2}
                >
                    <Grid item xs>
                        <CheckoutList />
                    </Grid>
                    <Grid item>
                        <OrderSummary vatRate={17} />
                    </Grid>
                </Grid>
            </ShoppingCartProvider>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
