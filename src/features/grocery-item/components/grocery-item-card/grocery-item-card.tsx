import React from 'react';

import { BiMinus, BiPlus } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';

import { Grocery } from '@/abstraction';
import { theme } from '@/styles/theme';
import { currencyFormatter } from '@/utils';
import styled from '@emotion/styled';
import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/material';

export const StyledCard = styled(Card)`
    border: 1px solid #ededed;
    border-radius: 18px;
    max-width: 320px;
`;

export const StyledAmount = styled(Box)`
    background-color: ${theme.palette.primary.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px 0 0 6px;
`;

type Props = {
    grocery: Grocery;
};

export const GroceryItemCard: React.FC<Props> = (props) => {
    const { grocery } = props;

    return (
        <StyledCard elevation={0}>
            <Box
                sx={{
                    height: '240px',
                    width: '100%',
                    backgroundColor: '#EDEDED',
                    [theme.breakpoints.down('sm')]: {
                        height: '188px',
                    },
                }}
            />

            <Grid
                container
                sx={{
                    padding: '20px',
                    [theme.breakpoints.down('sm')]: {
                        padding: '17px 14px',
                    },
                }}
            >
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                        marginBottom: '18px',
                        [theme.breakpoints.down('sm')]: {
                            marginBottom: '8px',
                        },
                    }}
                >
                    <Typography
                        variant={'h6'}
                        display={'inline'}
                        fontWeight={400}
                    >
                        {grocery.name}
                    </Typography>
                    <Typography
                        variant={'h6'}
                        display={'inline'}
                        fontWeight={600}
                        color={'primary'}
                    >
                        {currencyFormatter.format(grocery.price)}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <StyledAmount
                        sx={{
                            [theme.breakpoints.down('sm')]: {
                                borderRadius: '6px 6px 0 0',
                            },
                        }}
                    >
                        <IconButton>
                            <BiPlus color={'white'}>+</BiPlus>
                        </IconButton>
                        <Typography variant={'h6'} color={'secondary'}>
                            1
                        </Typography>
                        <IconButton>
                            <BiMinus color={'white'}>-</BiMinus>
                        </IconButton>
                    </StyledAmount>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant={'contained'}
                        fullWidth
                        sx={{
                            height: '100%',
                            boxShadow: 'none',
                            borderRadius: '0 6px 6px 0',
                            [theme.breakpoints.down('sm')]: {
                                borderRadius: '0 0 6px 6px',
                                padding: '10px',
                            },
                        }}
                    >
                        <FiShoppingCart color={'white'} size={20} />
                    </Button>
                </Grid>
            </Grid>
        </StyledCard>
    );
};
