import React from 'react';

import { Grocery } from '@/abstraction';
import { GroceryItemCard } from '@/features/grocery-item';
import { Grid } from '@mui/material';

type Props = {
    groceries: Grocery[];
};

export const GroceriesCardsList: React.FC<Props> = (props) => {
    const { groceries } = props;

    return (
        <Grid container spacing={2}>
            {groceries.map((grocery, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                    <GroceryItemCard grocery={grocery} />
                </Grid>
            ))}
        </Grid>
    );
};
