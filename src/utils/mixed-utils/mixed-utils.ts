import { Grocery } from '@/abstraction';
import { FormatMoney } from 'format-money-js';

export const currencyFormatter = new FormatMoney({
    decimals: 2,
    symbol: '₪',
});

export const groceryRequestFormatter = (data): Grocery => {
    if (data?.contents?.search_results?.length > 0) {
        const item = data.contents.search_results[0];
        return {
            id: item.code,
            name: item.description.split(',').slice(0, -1).join(','),
            price: Number(item.price_range?.[1] ?? '0'),
        };
    }
};
