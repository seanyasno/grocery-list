import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { isEmpty } from 'lodash';

type ContextProps = {
    favoriteGroceriesIds: string[];

    isFavoriteGrocery: (id: string) => boolean;
    addFavoriteGrocery: (id: string) => void;
    removeFavoriteGrocery: (id: string) => void;
};

export const FavoriteGroceriesContext = createContext<ContextProps>({
    favoriteGroceriesIds: [],
    isFavoriteGrocery: () => false,
    addFavoriteGrocery: () => {},
    removeFavoriteGrocery: () => {},
});

type Props = {
    loadFromLocalStorage?: boolean;
    initialFavoriteGroceriesIds?: string[];
};

export const FavoriteGroceriesProvider: React.FC<PropsWithChildren<Props>> = (
    props
) => {
    const {
        children,
        loadFromLocalStorage = true,
        initialFavoriteGroceriesIds,
    } = props;

    const [favoriteGroceriesIds, setFavoriteGroceriesIds] = useState(
        initialFavoriteGroceriesIds ? initialFavoriteGroceriesIds : undefined
    );

    const isFavoriteGrocery = useCallback(
        (id: string) => favoriteGroceriesIds?.includes(id),
        [favoriteGroceriesIds]
    );

    const addFavoriteGrocery = useCallback(
        (id: string) => {
            if (isFavoriteGrocery(id)) {
                return;
            }

            setFavoriteGroceriesIds((prev) => [...prev, id]);
        },
        [isFavoriteGrocery]
    );

    const removeFavoriteGrocery = useCallback(
        (id: string) => {
            if (!isFavoriteGrocery(id)) {
                return;
            }

            setFavoriteGroceriesIds((prev) =>
                prev.filter((groceryId) => groceryId !== id)
            );
        },
        [isFavoriteGrocery]
    );

    useEffect(() => {
        if (!loadFromLocalStorage) {
            return;
        }
        if (!isEmpty(localStorage.getItem('favoriteGroceriesIds'))) {
            setFavoriteGroceriesIds(
                JSON.parse(localStorage.getItem('favoriteGroceriesIds'))
            );
        }
    }, []);

    useEffect(() => {
        if (!loadFromLocalStorage || favoriteGroceriesIds === undefined) {
            return;
        }

        localStorage.setItem(
            'favoriteGroceriesIds',
            JSON.stringify(favoriteGroceriesIds)
        );
    }, [favoriteGroceriesIds, loadFromLocalStorage]);

    return (
        <FavoriteGroceriesContext.Provider
            value={{
                favoriteGroceriesIds,
                isFavoriteGrocery,
                addFavoriteGrocery,
                removeFavoriteGrocery,
            }}
        >
            {children}
        </FavoriteGroceriesContext.Provider>
    );
};
