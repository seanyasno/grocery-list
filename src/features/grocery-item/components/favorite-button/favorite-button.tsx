import React, { useContext, useMemo } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { FavoriteGroceriesContext } from '@/contexts';
import { IconButton, SxProps, Theme } from '@mui/material';
import { IconButtonPropsColorOverrides } from '@mui/material/IconButton/IconButton';
import { OverridableStringUnion } from '@mui/types';

type Props = {
    groceryId: string;
    name: string;
    color?: OverridableStringUnion<
        | 'inherit'
        | 'default'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning',
        IconButtonPropsColorOverrides
    >;
    size?: number;
    sx?: SxProps<Theme>;
};

export const FavoriteButton: React.FC<Props> = (props) => {
    const { groceryId, name, color, size, sx } = props;
    const { isFavoriteGrocery, addFavoriteGrocery, removeFavoriteGrocery } =
        useContext(FavoriteGroceriesContext);

    const isFavorite = useMemo(
        () => isFavoriteGrocery(groceryId),
        [groceryId, isFavoriteGrocery]
    );

    const addToFavoriteLabel = `הוסף ${name} למועדפים`;
    const removeFromFavoriteLabel = `הסר ${name} ממועדפים`;

    return (
        <IconButton
            aria-label={
                isFavorite ? addToFavoriteLabel : removeFromFavoriteLabel
            }
            color={color}
            sx={sx}
            onClick={() => {
                if (isFavorite) {
                    removeFavoriteGrocery(groceryId);
                } else {
                    addFavoriteGrocery(groceryId);
                }
            }}
        >
            {isFavorite ? (
                <AiFillHeart size={size} />
            ) : (
                <AiOutlineHeart size={size} />
            )}
        </IconButton>
    );
};
