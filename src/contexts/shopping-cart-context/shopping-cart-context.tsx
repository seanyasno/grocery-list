import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import React from 'react';

import { CartItem, Grocery } from '@/abstraction';
import { cloneWith } from 'lodash';

type ContextProps = {
    cart: CartItem[];

    addGrocery: (grocery: Grocery, amount: number) => void;
    removeGrocery: (id: string) => void;
    getAmountOfGrocery: (id: string) => number;
};

export const ShoppingCartContext = createContext<ContextProps>({
    cart: [],
    addGrocery: (grocery: Grocery) => {},
    removeGrocery: (id: string) => {},
    getAmountOfGrocery: (id: string) => 0,
});

type Props = {};

export const ShoppingCartProvider: React.FC<PropsWithChildren<Props>> = (
    props
) => {
    const { children } = props;

    const [cart, setCart] = useState<CartItem[]>([]);

    const addGrocery = useCallback(
        (grocery: Grocery, amount: number) => {
            const existingGrocery = cart.find(
                (g) => g.grocery.id === grocery.id
            );

            if (existingGrocery) {
                existingGrocery.amount += amount;
                setCart([...cart]);
            } else {
                setCart([...cart, { grocery: cloneWith(grocery), amount }]);
            }
        },
        [cart]
    );

    const removeGrocery = useCallback(
        (id: string) => {
            const existingGrocery = cart.find((g) => g.grocery.id === id);

            if (existingGrocery) {
                existingGrocery.amount -= 1;
                setCart([...cart]);
            }
        },
        [cart]
    );

    const getAmountOfGrocery = useCallback(
        (id: string) => {
            const existingGrocery = cart.find(
                ({ grocery }) => grocery.id === id
            );

            if (existingGrocery) {
                return existingGrocery.amount;
            } else {
                return 0;
            }
        },
        [cart]
    );

    return (
        <ShoppingCartContext.Provider
            value={{
                cart,
                addGrocery,
                removeGrocery,
                getAmountOfGrocery,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};
