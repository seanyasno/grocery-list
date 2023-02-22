import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import { ShoppingCartContext } from '@/contexts';
import { LiveBillItem } from '@/features/live-bill';
import { currencyFormatter } from '@/utils';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

export const LiveBillList: React.FC = () => {
    const { cart, totalPrice } = useContext(ShoppingCartContext);
    const router = useRouter();

    return (
        <Stack sx={{ height: '100%' }}>
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

            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                }}
            >
                <Button
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    sx={{
                        marginTop: 'auto',
                        marginBottom: '20px',
                        boxShadow: 'none',
                        fontWeight: 600,
                        fontSize: '18px',
                    }}
                    onClick={() => router.push('/checkout')}
                >
                    {'תשלום '}
                    {currencyFormatter.from(totalPrice).toString()}
                </Button>
            </Box>
        </Stack>
    );
};
