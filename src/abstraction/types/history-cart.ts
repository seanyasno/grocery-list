import { CartItem } from '@/abstraction';

export type HistoryCart = {
    id: string;
    cart: CartItem[];
    orderDate: Date;
    deliveryDate: Date;
};
