import { FormattedGroceryItem } from '@/abstraction';

export type SummarizedChainStores = {
    [chain: string]: {
        [store: string]: {
            totalPrice: number;
            items: {
                [groceryId: string]: FormattedGroceryItem;
            };
        };
    };
};
