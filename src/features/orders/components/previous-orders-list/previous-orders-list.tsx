import React from 'react';

import { HistoryCart } from '@/abstraction';
import { PreviousSingleOrderList } from '@/features/orders';

type Props = {
    historyCarts?: HistoryCart[];
};

export const PreviousOrdersList: React.FC<Props> = (props) => {
    const { historyCarts = [] } = props;

    return (
        <div>
            {historyCarts.map((historyCart, index) => (
                <PreviousSingleOrderList
                    key={index}
                    historyCart={historyCart}
                />
            ))}
        </div>
    );
};
