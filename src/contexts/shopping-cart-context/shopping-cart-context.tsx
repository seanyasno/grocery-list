import {
    createContext,
    PropsWithChildren,
    useCallback,
    useMemo,
    useState,
} from 'react';
import React from 'react';

import { CartItem, Grocery } from '@/abstraction';
import { cloneWith } from 'lodash';

type ContextProps = {
    cart: CartItem[];
    totalPrice: number;

    addGrocery: (grocery: Grocery, amount: number) => void;
    removeGrocery: (id: string) => void;
    getAmountOfGrocery: (id: string) => number;
};

export const ShoppingCartContext = createContext<ContextProps>({
    cart: [],
    totalPrice: 0,
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

    const totalPrice = useMemo(
        () =>
            cart.reduce((acc, { grocery, amount }) => {
                return acc + grocery.price * amount;
            }, 0),
        [cart]
    );

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
                setCart((prevCart) =>
                    prevCart.filter((item) => item.grocery.id !== id)
                );
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
                totalPrice,
                addGrocery,
                removeGrocery,
                getAmountOfGrocery,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};
