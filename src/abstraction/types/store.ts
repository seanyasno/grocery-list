import { FormattedGroceryItem } from '@/abstraction';

export type Store = {
    [groceryId: string]: FormattedGroceryItem;
};
