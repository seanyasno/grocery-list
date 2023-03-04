import { Store } from '@/abstraction';

export type Chain = {
    [store: string]: Store;
};
