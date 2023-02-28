import React from 'react';

import { HistoryCart } from '@/abstraction';
import { theme } from '@/styles/theme';
import { currencyFormatter } from '@/utils';
import styled from '@emotion/styled';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';

export const Container = styled.div`
    border: 1.2px solid #e2e8f0;
    border-radius: 10px;
    background: #fff;
`;

type Props = {
    historyCart: HistoryCart;
};

export const PreviousSingleOrderList: React.FC<Props> = (props) => {
    const { historyCart } = props;

    return (
        <Container>
            <Stack
                direction={'row'}
                padding={'20px'}
                justifyContent={'space-between'}
            >
                <Stack direction={'column'}>
                    <Stack
                        direction={'row'}
                        columnGap={'6px'}
                        alignItems={'center'}
                    >
                        <Typography
                            color={theme.palette.info.main}
                            fontWeight={400}
                            fontSize={'13px'}
                        >
                            מספר הזמנה:
                        </Typography>
                        <Typography
                            color={'primary'}
                            fontWeight={600}
                            fontSize={'14px'}
                        >
                            {historyCart.id}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={'row'}
                        columnGap={'6px'}
                        alignItems={'center'}
                    >
                        <Typography
                            color={theme.palette.info.main}
                            fontWeight={400}
                            fontSize={'13px'}
                        >
                            הוזמן בתאריך:
                        </Typography>
                        <Typography
                            color={'secondary'}
                            fontWeight={500}
                            fontSize={'14px'}
                        >
                            {historyCart.orderDate.toLocaleDateString()}
                        </Typography>
                    </Stack>
                </Stack>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    sx={{ margin: 'auto 0 auto 0' }}
                >
                    הזמן שוב
                </Button>
            </Stack>
            <Divider sx={{ background: '#e2e8f0' }} />
            {historyCart.cart.map((cartItem, index) => (
                <Box key={index}>
                    <Grid
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        padding={'20px'}
                    >
                        <Grid item xs={3}>
                            <Stack
                                direction={'row'}
                                alignItems={'center'}
                                columnGap={'16px'}
                            >
                                <Box
                                    sx={{
                                        height: '92px',
                                        width: '92px',
                                        borderRadius: '8px',
                                        backgroundColor: '#F7FAFC',
                                    }}
                                />
                                <Box>
                                    <Typography
                                        fontSize={'18px'}
                                        fontWeight={600}
                                    >
                                        {cartItem.grocery.name}
                                    </Typography>
                                    <Typography
                                        fontSize={'16px'}
                                        fontWeight={400}
                                        color={'transparent'}
                                    >
                                        {cartItem.grocery.name}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography
                                color={theme.palette.info.main}
                                fontWeight={500}
                                fontSize={'16px'}
                            >
                                כמות:
                            </Typography>
                            <Typography fontSize={'16px'} fontWeight={600}>
                                {cartItem.amount}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography
                                color={theme.palette.info.main}
                                fontWeight={500}
                                fontSize={'16px'}
                            >
                                מחיר כולל:
                            </Typography>
                            <Typography
                                fontWeight={700}
                                fontSize={'20px'}
                                color={'primary'}
                            >
                                {currencyFormatter
                                    .from(
                                        cartItem.grocery.price * cartItem.amount
                                    )
                                    .toString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography
                                color={theme.palette.info.main}
                                fontWeight={500}
                                fontSize={'16px'}
                            >
                                תאריך הזמנה:
                            </Typography>
                            <Typography fontSize={'16px'} fontWeight={600}>
                                {historyCart.deliveryDate.toLocaleDateString()}
                            </Typography>
                        </Grid>
                    </Grid>

                    {index !== historyCart.cart.length - 1 && (
                        <Divider sx={{ background: '#e2e8f0' }} />
                    )}
                </Box>
            ))}
        </Container>
    );
};
