import React from 'react';

import { Grocery } from '@/abstraction';
import { GroceryItemCard } from '@/features/grocery-item';
import { Grid } from '@mui/material';

type Props = {
    savedGroceries?: Grocery[];
};

export const SavedOrdersList: React.FC<Props> = (props) => {
    const { savedGroceries = [] } = props;

    return (
        <Grid container spacing={2}>
            {savedGroceries.map((grocery, index) => (
                <Grid item xs={6} md={4} lg={3} key={index}>
                    <GroceryItemCard grocery={grocery} />
                </Grid>
            ))}
        </Grid>
    );
};
