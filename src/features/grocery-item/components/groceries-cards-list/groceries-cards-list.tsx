import React from 'react';

import { Grocery } from '@/abstraction';
import { GroceryItemCard } from '@/features/grocery-item';
import { Grid } from '@mui/material';

type Props = {
    groceries: Grocery[];
    shrink?: boolean;
};

export const GroceriesCardsList: React.FC<Props> = (props) => {
    const { groceries, shrink } = props;

    return (
        <Grid container spacing={2}>
            {groceries.map((grocery, index) => (
                <Grid
                    item
                    xs={6}
                    sm={shrink ? 12 : 6}
                    md={shrink ? 6 : 4}
                    lg={shrink ? 4 : 3}
                    key={index}
                >
                    <GroceryItemCard grocery={grocery} />
                </Grid>
            ))}
        </Grid>
    );
};
