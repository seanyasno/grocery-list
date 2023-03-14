import React from 'react';

import { NextPage } from 'next';

import { Footer, ResponsiveAppBar } from '@/components';
import { ShoppingCartProvider } from '@/contexts';
import {
    CheckoutList,
    LeftSection,
    OrderSummary,
    PriceComparison,
} from '@/features/checkout';
import { theme } from '@/styles/theme';
import { Box, Grid } from '@mui/material';
import { isEmpty } from 'lodash';

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
                    <LeftSection />
                </Grid>
            </ShoppingCartProvider>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
