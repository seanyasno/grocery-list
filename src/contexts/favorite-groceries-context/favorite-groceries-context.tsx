import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { firestore } from '@/config';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
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
    uid?: string;
    loadFromLocalStorage?: boolean;
    initialFavoriteGroceriesIds?: string[];
};

export const FavoriteGroceriesProvider: React.FC<PropsWithChildren<Props>> = (
    props
) => {
    const {
        children,
        uid,
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
        async (id: string) => {
            if (isFavoriteGrocery(id)) {
                return;
            }

            try {
                if (!isEmpty(uid)) {
                    const userRef = doc(firestore, 'users', uid);
                    const userDoc = await getDoc(userRef);
                    const favoriteGroceries =
                        userDoc.get('favoriteGroceries') || [];
                    favoriteGroceries.push(id);
                    await updateDoc(userRef, { favoriteGroceries });
                    setFavoriteGroceriesIds((prev) => [...prev, id]);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [isFavoriteGrocery, uid]
    );

    const removeFavoriteGrocery = useCallback(
        async (id: string) => {
            if (!isFavoriteGrocery(id)) {
                return;
            }

            try {
                if (!isEmpty(uid)) {
                    const userRef = doc(firestore, 'users', uid);
                    const userDoc = await getDoc(userRef);
                    const favoriteGroceries =
                        userDoc.get('favoriteGroceries') || [];
                    const index = favoriteGroceries.indexOf(id);
                    favoriteGroceries.splice(index, 1);
                    await updateDoc(userRef, { favoriteGroceries });
                    setFavoriteGroceriesIds((prev) =>
                        prev.filter((groceryId) => groceryId !== id)
                    );
                }
            } catch (error) {
                console.error(error);
            }
        },
        [isFavoriteGrocery, uid]
    );

    useEffect(() => {
        setFavoriteGroceriesIds(initialFavoriteGroceriesIds);
    }, [initialFavoriteGroceriesIds]);

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
