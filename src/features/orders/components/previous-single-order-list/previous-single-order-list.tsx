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
                        columnGap={'6px'}
                        sx={{
                            flexDirection: 'column',
                            textAlign: 'start',
                            alignItems: 'start',
                            [theme.breakpoints.up('md')]: {
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                        }}
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
                        columnGap={'6px'}
                        sx={{
                            flexDirection: 'column',
                            textAlign: 'start',
                            alignItems: 'start',
                            [theme.breakpoints.up('md')]: {
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                        }}
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
                        padding={'20px'}
                        sx={{
                            alignItems: 'start',
                            [theme.breakpoints.up('sm')]: {
                                alignItems: 'center',
                            },
                        }}
                    >
                        <Grid item xs={8} md={3}>
                            <Stack
                                direction={'row'}
                                columnGap={'16px'}
                                sx={{
                                    alignItems: 'center',
                                    [theme.breakpoints.down('sm')]: {
                                        alignItems: 'flex-start',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        height: '92px',
                                        width: '92px',
                                        borderRadius: '8px',
                                        backgroundColor: '#F7FAFC',
                                        [theme.breakpoints.down('sm')]: {
                                            height: '68px',
                                            width: '68px',
                                            minWidth: '68px',
                                        },
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
                                        display={{ xs: 'none' }}
                                    >
                                        {cartItem.grocery.name}
                                    </Typography>

                                    <Stack
                                        sx={{
                                            [theme.breakpoints.up('md')]: {
                                                display: 'none',
                                            },
                                        }}
                                        display={{ xs: 'flex' }}
                                        direction={'row'}
                                        columnGap={'4px'}
                                    >
                                        <Typography
                                            color={theme.palette.info.main}
                                            fontWeight={500}
                                            fontSize={'16px'}
                                        >
                                            כמות:
                                        </Typography>
                                        <Typography
                                            fontSize={'16px'}
                                            fontWeight={600}
                                        >
                                            {cartItem.amount}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item display={{ xs: 'none', md: 'block' }} md={3}>
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
                        <Grid item xs={4} md={3}>
                            <Typography
                                color={theme.palette.info.main}
                                fontWeight={500}
                                fontSize={'16px'}
                                sx={{
                                    [theme.breakpoints.down('sm')]: {
                                        display: 'none',
                                    },
                                }}
                            >
                                מחיר כולל:
                            </Typography>
                            <Typography
                                fontWeight={700}
                                fontSize={'20px'}
                                color={'primary'}
                                sx={{
                                    [theme.breakpoints.down('sm')]: {
                                        textAlign: 'end',
                                    },
                                }}
                            >
                                {currencyFormatter
                                    .from(
                                        cartItem.grocery.price * cartItem.amount
                                    )
                                    .toString()}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={3}
                            sx={{
                                [theme.breakpoints.down('sm')]: {
                                    flexDirection: 'row',
                                    display: 'flex',
                                    columnGap: '6px',
                                    marginTop: '10px',
                                },
                            }}
                        >
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
