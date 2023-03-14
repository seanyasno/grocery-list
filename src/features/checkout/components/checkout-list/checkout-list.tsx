import React, { useContext } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { HiOutlineArrowRight } from 'react-icons/hi';

import { ShoppingCartContext } from '@/contexts';
import { CheckoutItem } from '@/features/checkout';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

const Container = styled.div`
    border: 1px solid #dee2e7;
    padding: 23px;
    border-radius: 6px;
`;

type Props = {};

export const CheckoutList: React.FC<Props> = (props) => {
    const { cart, resetCart } = useContext(ShoppingCartContext);
    const router = useRouter();

    const emptyCartLabel = 'הסל קניות שלך ריק';
    const backButtonLabel = 'חזרה לחנות';
    const deleteAllButtonLabel = 'הורד הכל מהסל';

    return (
        <Container>
            {isEmpty(cart) ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        src={'./svgs/undraw_empty_cart_co35.svg'}
                        alt={'empty cart image'}
                        width={300}
                        height={300}
                    />
                    <Typography
                        color={theme.palette.secondary.main}
                        fontWeight={600}
                        fontSize={'18px'}
                    >
                        {emptyCartLabel}
                    </Typography>
                </Box>
            ) : (
                <>
                    {cart?.map((cartItem, index) => (
                        <React.Fragment key={index}>
                            <CheckoutItem cartItem={cartItem} />
                            <Divider sx={{ margin: '20px 0' }} />
                        </React.Fragment>
                    ))}
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Button
                            variant={'contained'}
                            color={'info'}
                            onClick={() => router.push('/')}
                        >
                            <HiOutlineArrowRight
                                style={{ marginLeft: '6px' }}
                            />
                            {backButtonLabel}
                        </Button>
                        <Button
                            variant={'outlined'}
                            color={'error'}
                            sx={{
                                border: `1px solid ${theme.palette.error.main}`,
                                boxShadow: 'none',
                            }}
                            onClick={() => resetCart()}
                        >
                            {deleteAllButtonLabel}
                        </Button>
                    </Stack>
                </>
            )}
        </Container>
    );
};
