import React, { useContext } from 'react';

import { ShoppingCartContext } from '@/contexts';
import { OrderSummary, PriceComparison } from '@/features/checkout';
import { Box, Grid } from '@mui/material';
import { isEmpty } from 'lodash';

export const LeftSection: React.FC = () => {
    const { cart } = useContext(ShoppingCartContext);

    return (
        <Grid
            item
            maxWidth={'433px'}
            width={'100%'}
            order={{
                xs: 1,
                md: 2,
            }}
            hidden={isEmpty(cart)}
        >
            <Box sx={{ marginBottom: '12px' }}>
                <PriceComparison />
            </Box>
            <OrderSummary vatRate={17} />
        </Grid>
    );
};
