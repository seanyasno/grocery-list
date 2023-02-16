import React from 'react';

import { BiMinus, BiPlus } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';

import { Grocery } from '@/abstraction';
import { currencyFormatter } from '@/utils';
import { Grid, IconButton, Typography } from '@mui/material';

import {
    AddToCartButton,
    BottomSectionGrid,
    InfoGrid,
    StyledAmount,
    StyledCard,
    TempImage,
} from './grocery-item-card-styles';

type Props = {
    grocery: Grocery;
};

export const GroceryItemCard: React.FC<Props> = (props) => {
    const { grocery } = props;

    return (
        <StyledCard elevation={0}>
            <TempImage />

            <BottomSectionGrid container>
                <InfoGrid item xs={12}>
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
                        {currencyFormatter.from(grocery.price)?.toString()}
                    </Typography>
                </InfoGrid>

                <Grid item xs={12} sm={6}>
                    <StyledAmount>
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
                    <AddToCartButton variant={'contained'} fullWidth>
                        <FiShoppingCart color={'white'} size={20} />
                    </AddToCartButton>
                </Grid>
            </BottomSectionGrid>
        </StyledCard>
    );
};
