import type React from 'react';

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

export const reportAccessibility = async (
    App: typeof React,
    config?: Record<string, unknown>
): Promise<void> => {
    if (
        typeof window !== 'undefined' &&
        process.env.NODE_ENV !== 'production'
    ) {
        const axe = await import('@axe-core/react');
        const ReactDOM = await import('react-dom');

        axe.default(App, ReactDOM, 1000, config);
    }
};
