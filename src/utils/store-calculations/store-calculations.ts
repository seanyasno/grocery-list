import {
    CartItem,
    Chain,
    Chains,
    FormattedGroceryItem,
    GroceryItemRequestFormat,
    Store,
    SummarizedChainStores,
} from '@/abstraction';
import {
    every,
    findKey,
    flatten,
    forEach,
    groupBy,
    isEmpty,
    keyBy,
    keys,
    mapValues,
    pickBy,
    sortBy,
} from 'lodash';

export const formatGroceryItem = (
    item: GroceryItemRequestFormat
): FormattedGroceryItem => {
    return {
        chainName: item.CHAINNAME,
        storeName: item.STORENAME,
        address: item.ADDRESS,
        city: item.CITY,
        price: Number(item.PRICE),
        discountedPrice: !isEmpty(item.DISCOUNTDESC)
            ? Number(item.DISCOUNTEDPRICE)
            : undefined,
        discountedDesc: item.DISCOUNTDESC,
    };
};

export const reformatData = (data: GroceryItemRequestFormat[]): Chains => {
    return mapValues(
        groupBy(flatten(Object.values(data)), 'CHAINNAME'),
        (values) =>
            mapValues(groupBy(values, 'STORENAME'), (arr) =>
                mapValues(
                    keyBy(arr, (item) =>
                        findKey(data, (arr) => (arr as any).includes(item))
                    ),
                    (item) => formatGroceryItem(item)
                )
            )
    );
};

export const summarizeData = (
    data: Chains,
    cart: CartItem[]
): SummarizedChainStores => {
    const cheapestStores: SummarizedChainStores = {};

    forEach(data, (chain, chainName) => {
        cheapestStores[chainName] = {};

        forEach(chain, (store, storeName) => {
            let totalPrice = 0;
            const items: Store = {};

            forEach(store, (item, itemId) => {
                const itemPrice =
                    item.price *
                    cart.find((cartItem) => cartItem.grocery.id === itemId)
                        ?.amount;
                // const itemPrice =
                //     (item.discountedPrice || item.price) *
                //     cart.find((cartItem) => cartItem.grocery.id === itemId)
                //         ?.amount;
                totalPrice += Number(itemPrice);
                items[itemId] = item;
            });

            if (
                !cheapestStores[chainName][storeName] ||
                totalPrice < cheapestStores[chainName][storeName].totalPrice
            ) {
                cheapestStores[chainName][storeName] = {
                    totalPrice,
                    items,
                };
            }
        });
    });

    return cheapestStores;
};

export const filterStoreWithLackOfItems = (
    stores: SummarizedChainStores,
    groceriesIds: string[]
): SummarizedChainStores => {
    return pickBy(stores, (chain) =>
        every(
            chain,
            (store) => keys(store.items).length === groceriesIds.length
        )
    );
};

export const getTopCheapestStores = (
    stores: SummarizedChainStores,
    amount = 3
): Chain[] => {
    // Get all the stores as an array of { chain, store, totalPrice } objects
    const storesArray = Object.keys(stores).flatMap((chain) =>
        Object.keys(stores[chain]).map((store) => ({
            chain,
            store,
            totalPrice: stores[chain][store].totalPrice,
        }))
    );

    // Sort the stores by totalPrice in ascending order
    const sortedStores = sortBy(storesArray, 'totalPrice');

    // Take the top 3 stores with the lowest totalPrice
    const top3Stores = sortedStores.slice(0, amount);

    // Group the stores by chain and store
    const groupedStores = groupBy(top3Stores, 'chain');

    // Convert the grouped stores into an array of Chain objects
    return Object.keys(groupedStores).map((chain) => ({
        [chain]: groupedStores[chain].reduce((acc, store) => {
            acc[store.store] = stores[chain][store.store];
            return acc;
        }, {}),
    }));
};
