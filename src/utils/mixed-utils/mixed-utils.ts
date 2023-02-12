import { FormatMoney } from 'format-money-js';

export const currencyFormatter = new FormatMoney({
    decimals: 2,
    symbol: '₪',
});
