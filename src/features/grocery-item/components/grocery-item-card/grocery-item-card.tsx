import React, { useCallback, useContext, useMemo, useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';

import { Grocery } from '@/abstraction';
import { FavoriteGroceriesContext, ShoppingCartContext } from '@/contexts';
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
    const { addGrocery } = useContext(ShoppingCartContext);
    const { isFavoriteGrocery, addFavoriteGrocery, removeFavoriteGrocery } =
        useContext(FavoriteGroceriesContext);
    const [amountToAdd, setAmountToAdd] = useState(0);

    const isFavorite = useMemo(
        () => isFavoriteGrocery(grocery.id),
        [grocery.id, isFavoriteGrocery]
    );

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
    }, [addGrocery, grocery, amountToAdd]);

    return (
        <StyledCard elevation={0}>
            <TempImage>
                <IconButton
                    color={'primary'}
                    sx={{ margin: '6px' }}
                    onClick={() => {
                        if (isFavorite) {
                            removeFavoriteGrocery(grocery.id);
                        } else {
                            addFavoriteGrocery(grocery.id);
                        }
                    }}
                >
                    {isFavorite ? (
                        <AiFillHeart size={24} />
                    ) : (
                        <AiOutlineHeart size={24} />
                    )}
                </IconButton>
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
