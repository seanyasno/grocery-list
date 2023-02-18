import React, { useContext } from 'react';

import { ShoppingCartContext } from '@/contexts';
import { LiveBillItem } from '@/features/live-bill';
import { currencyFormatter } from '@/utils';
import { Box, Grid, Stack, Typography } from '@mui/material';

export const LiveBillList: React.FC = () => {
    const { cart, totalPrice } = useContext(ShoppingCartContext);

    return (
        <Box>
            {cart.map((item, index) => (
                <LiveBillItem key={index} cartItem={item} />
            ))}

            <Grid container item columnSpacing={8} mt={'20px'}>
                <Grid item xs={4}>
                    <Typography
                        color={'#7C8694'}
                        fontWeight={500}
                        fontSize={'14px'}
                    >
                        סה״כ מחיר
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography
                        color={'secondary'}
                        fontWeight={600}
                        fontSize={'18px'}
                    >
                        {currencyFormatter.from(totalPrice).toString()}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
