import React from 'react';

import { GroceryCategoryItem } from '@/features/groceries-categories';
import { Stack } from '@mui/material';

type GroceryCategory = {
    name: string;
    imageSrc: string;
    href?: string;
};

const groceryCategories: GroceryCategory[] = [
    {
        name: 'פירות וירקות',
        imageSrc: '/images/grocery-categories-icons/fruits.webp',
    },
    {
        name: 'חלב וביצים',
        imageSrc: '/images/grocery-categories-icons/milk-and-eggs.webp',
    },
    {
        name: 'בשר ודגים',
        imageSrc: '/images/grocery-categories-icons/meat.webp',
    },
    {
        name: 'מוצרי פארם',
        imageSrc: '/images/grocery-categories-icons/pharm.webp',
    },
    {
        name: 'קפואים',
        imageSrc: '/images/grocery-categories-icons/frozen.webp',
    },
    {
        name: 'בישול ואפיה',
        imageSrc: '/images/grocery-categories-icons/cooking.webp',
    },
    {
        name: 'תינוקות',
        imageSrc: '/images/grocery-categories-icons/babies.webp',
    },
    { name: 'שתייה', imageSrc: '/images/grocery-categories-icons/drinks.webp' },
    {
        name: 'חטיפים וממתקים',
        imageSrc: '/images/grocery-categories-icons/snacks.webp',
    },
    {
        name: 'מאפים',
        imageSrc: '/images/grocery-categories-icons/pastries.webp',
    },
];

export const GroceriesCategoriesList: React.FC = () => {
    return (
        <Stack
            direction={'row'}
            textAlign={'center'}
            spacing={4}
            flexGrow={1}
            width={'300px'}
            overflow={'auto'}
        >
            {groceryCategories.map((category, index) => (
                <GroceryCategoryItem
                    key={index}
                    name={category.name}
                    imageSrc={category.imageSrc}
                />
            ))}
        </Stack>
    );
};
