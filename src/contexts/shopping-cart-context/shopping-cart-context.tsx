import {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import React from 'react';

import { CartItem, Grocery } from '@/abstraction';
import { cloneWith, isEmpty } from 'lodash';

type ContextProps = {
    cart: CartItem[];
    totalPrice: number;

    addGrocery: (grocery: Grocery, amount: number) => void;
    removeGrocery: (id: string, amount?: number) => void;
    resetCart: () => void;
    getAmountOfGrocery: (id: string) => number;
};

export const ShoppingCartContext = createContext<ContextProps>({
    cart: [],
    totalPrice: 0,
    addGrocery: (grocery: Grocery) => {},
    removeGrocery: (id: string) => {},
    resetCart: () => {},
    getAmountOfGrocery: (id: string) => 0,
});

type Props = {};

export const ShoppingCartProvider: React.FC<PropsWithChildren<Props>> = (
    props
) => {
    const { children } = props;

    const [cart, setCart] = useState<CartItem[]>(undefined);

    const totalPrice = useMemo(
        () =>
            cart?.reduce((acc, { grocery, amount }) => {
                return acc + grocery.price * amount;
            }, 0),
        [cart]
    );

    const addGrocery = useCallback(
        (grocery: Grocery, amount: number) => {
            const existingGrocery = cart?.find(
                (g) => g.grocery.id === grocery.id
            );

            if (existingGrocery) {
                existingGrocery.amount += amount;
                setCart([...cart]);
            } else {
                setCart([
                    ...(cart ?? []),
                    { grocery: cloneWith(grocery), amount },
                ]);
            }
        },
        [cart]
    );

    const removeGrocery = useCallback(
        (id: string, amount?: number) => {
            const existingGrocery = cart?.find((g) => g.grocery.id === id);

            if (existingGrocery) {
                if (amount && existingGrocery.amount - amount > 0) {
                    existingGrocery.amount -= amount;
                    setCart([...cart]);
                } else {
                    setCart((prevCart) =>
                        prevCart.filter((item) => item.grocery.id !== id)
                    );
                }
            }
        },
        [cart]
    );

    const resetCart = useCallback(() => {
        setCart([]);
    }, []);

    const getAmountOfGrocery = useCallback(
        (id: string) => {
            const existingGrocery = cart?.find(
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

    useEffect(() => {
        if (!isEmpty(localStorage.getItem('cart'))) {
            setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
        }
    }, []);

    useEffect(() => {
        if (cart !== undefined) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    return (
        <ShoppingCartContext.Provider
            value={{
                cart,
                totalPrice,
                addGrocery,
                removeGrocery,
                resetCart,
                getAmountOfGrocery,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};
