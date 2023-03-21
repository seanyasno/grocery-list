import React, { useCallback, useContext, useState } from 'react';

import { BiMinus, BiPlus } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';

import { Grocery } from '@/abstraction';
import { auth } from '@/config';
import { ShoppingCartContext } from '@/contexts';
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
    }, [addGrocery, grocery, amountToAdd, onAddToCart]);

    return (
        <StyledCard elevation={0}>
            <TempImage>
                {user && (
                    <FavoriteButton
                        groceryId={grocery.id}
                        name={grocery.name}
                        color={'primary'}
                        size={24}
                        sx={{ margin: '6px' }}
                    />
                )}
            </TempImage>

            <BottomSectionGrid container>
                <InfoGrid item xs={12}>
                    <Typography
                        fontSize={'18px'}
                        display={'inline'}
                        fontWeight={400}
                    >
                        {grocery.name}
                    </Typography>
                    <Typography
                        fontSize={'18px'}
                        display={'inline'}
                        fontWeight={600}
                        color={'primary'}
                    >
                        {currencyFormatter.from(grocery.price ?? 0)?.toString()}
                    </Typography>
                </InfoGrid>

                <Grid item xs={12} sm={6}>
                    <StyledAmount>
                        <IconButton
                            aria-label={`הגדל את הכמות של ${grocery.name} ב 1`}
                            onClick={handleIncrease}
                        >
                            <BiPlus color={'white'}>+</BiPlus>
                        </IconButton>
                        <Typography fontSize={'20px'} color={'secondary'}>
                            {amountToAdd}
                        </Typography>
                        <IconButton
                            aria-label={`הקטן את הכמות של ${grocery.name} ב 1`}
                            onClick={handleDecrease}
                        >
                            <BiMinus color={'white'}>-</BiMinus>
                        </IconButton>
                    </StyledAmount>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AddToCartButton
                        aria-label={`הוסף ${grocery.name} לעגלת קניות`}
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
