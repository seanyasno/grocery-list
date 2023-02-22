import React, { useContext, useMemo } from 'react';

import { ShoppingCartContext } from '@/contexts';
import { currencyFormatter } from '@/utils';
import styled from '@emotion/styled';
import { Button, Divider, Stack, Typography } from '@mui/material';

export const Container = styled.div`
    padding: 22px;
    border: 1px solid #dee2e7;
    border-radius: 10px;
`;

type Props = {
    vatRate: number;
};

export const OrderSummary: React.FC<Props> = (props) => {
    const { vatRate = 0 } = props;
    const { cart, totalPrice } = useContext(ShoppingCartContext);

    const subTotal = useMemo(
        () => totalPrice / (1 + (vatRate === 0 ? 0 : vatRate / 100)),
        [totalPrice, vatRate]
    );
    const vatTotal = useMemo(
        () => totalPrice - subTotal,
        [totalPrice, subTotal]
    );

    const title = 'סיכום חשבון';
    const subTotalLabel = 'סה"כ ללא מע"מ';
    const vatLabel = 'מע"מ';
    const totalLabel = 'סה"כ לתשלום';
    const buttonLabel = 'לתשלום';

    return (
        <Container>
            <Typography fontSize={'20px'} fontWeight={600}>
                {title}
            </Typography>

            <Divider sx={{ margin: '16px 0' }} />

            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography
                    fontSize={'14px'}
                    fontWeight={500}
                    color={'#7C8694'}
                >
                    {subTotalLabel}
                    {` (${cart?.length} פריטים)`}
                </Typography>
                <Typography fontSize={'16px'} fontWeight={600}>
                    {currencyFormatter.from(subTotal).toString()}
                </Typography>
            </Stack>

            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography
                    fontSize={'14px'}
                    fontWeight={500}
                    color={'#7C8694'}
                >
                    {vatLabel}
                    {` (${vatRate}%)`}
                </Typography>
                <Typography fontSize={'16px'} fontWeight={600}>
                    {currencyFormatter.from(vatTotal).toString()}
                </Typography>
            </Stack>

            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                margin={'30px 0'}
            >
                <Typography fontSize={'16px'} fontWeight={600}>
                    {totalLabel}
                </Typography>
                <Typography fontSize={'18px'} fontWeight={600}>
                    {currencyFormatter.from(totalPrice)?.toString()}
                </Typography>
            </Stack>

            <Button variant={'contained'} fullWidth>
                {buttonLabel}
            </Button>
        </Container>
    );
};
