import React, { useCallback, useContext, useMemo, useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';

import { Grocery } from '@/abstraction';
import { auth } from '@/config';
import { FavoriteGroceriesContext, ShoppingCartContext } from '@/contexts';
import { FavoriteButton } from '@/features/grocery-item';
import { currencyFormatter } from '@/utils';
import { Grid, IconButton, Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

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
    onAddToCart?: () => void;
};

export const GroceryItemCard: React.FC<Props> = (props) => {
    const { grocery, onAddToCart } = props;
    const { addGrocery } = useContext(ShoppingCartContext);
    const [amountToAdd, setAmountToAdd] = useState(0);
    const [user] = useAuthState(auth);

    const handleIncrease = useCallback(() => {
        setAmountToAdd((prev) => prev + 1);
    }, []);

    const handleDecrease = useCallback(() => {
        setAmountToAdd((prev) => {
            if (prev === 0) {
                return prev;
            }

            return prev - 1;
        });
    }, []);

    const handleAddToCart = useCallback(() => {
        addGrocery(grocery, amountToAdd);
        setAmountToAdd(0);
        onAddToCart?.();
    }, [addGrocery, grocery, amountToAdd]);

    return (
        <StyledCard elevation={0}>
            <TempImage>
                {user && (
                    <FavoriteButton
                        groceryId={grocery.id}
                        color={'primary'}
                        size={24}
                        sx={{ margin: '6px' }}
                    />
                )}
            </TempImage>

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
                        <IconButton onClick={handleIncrease}>
                            <BiPlus color={'white'}>+</BiPlus>
                        </IconButton>
                        <Typography variant={'h6'} color={'secondary'}>
                            {amountToAdd}
                        </Typography>
                        <IconButton onClick={handleDecrease}>
                            <BiMinus color={'white'}>-</BiMinus>
                        </IconButton>
                    </StyledAmount>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AddToCartButton
                        variant={'contained'}
                        fullWidth
                        onClick={handleAddToCart}
                    >
                        <FiShoppingCart color={'white'} size={20} />
                    </AddToCartButton>
                </Grid>
            </BottomSectionGrid>
        </StyledCard>
    );
};
