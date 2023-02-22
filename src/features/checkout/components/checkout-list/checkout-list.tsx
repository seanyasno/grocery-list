import React, { useContext } from 'react';

import { CartItem } from '@/abstraction';
import { ShoppingCartContext } from '@/contexts';
import { CheckoutItem } from '@/features/checkout';
import styled from '@emotion/styled';
import { Divider } from '@mui/material';

const Container = styled.div`
    border: 1px solid #dee2e7;
    padding: 23px;
    border-radius: 6px;
`;

type Props = {};

export const CheckoutList: React.FC<Props> = (props) => {
    const { cart } = useContext(ShoppingCartContext);

    return (
        <Container>
            {cart?.map((cartItem, index) => (
                <React.Fragment key={index}>
                    <CheckoutItem cartItem={cartItem} />
                    <Divider sx={{ margin: '20px 0' }} />
                </React.Fragment>
            ))}
        </Container>
    );
};
