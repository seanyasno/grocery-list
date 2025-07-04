import React, { useContext, useMemo } from 'react';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { CartItem } from '@/abstraction';
import { ShoppingCartContext } from '@/contexts';
import { theme } from '@/styles/theme';
import { currencyFormatter } from '@/utils';
import styled from '@emotion/styled';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

const ImageContainer = styled.div`
    height: 80px;
    width: 80px;
    background: #f7f7f7;
    border: 1px solid #e0e0e0;
    border-radius: 6px;

    ${theme.breakpoints.down('sm')} {
        height: 60px;
        width: 60px;
        aspect-ratio: 1/1;
        //margin-right: 8px;
    }
`;

const StyledIconButton = styled(IconButton)`
    color: #fff;
    border-radius: 4px;
    width: 30px;
    height: 30px;
`;

type Props = {
    cartItem: CartItem;
};

export const CheckoutItem: React.FC<Props> = (props) => {
    const { grocery, amount } = props.cartItem;
    const { addGrocery, removeGrocery } = useContext(ShoppingCartContext);

    const removeItemButtonLabel = 'הורד מהסל';

    const totalPrice = useMemo(
        () => grocery.price * amount,
        [grocery.price, amount]
    );

    return (
        <Stack direction={'row'}>
            <Box
                display={{
                    xs: 'none',
                    md: 'block',
                }}
            >
                <ImageContainer />
            </Box>
            <Stack
                width={'100%'}
                sx={{
                    padding: '0 10px',
                    [theme.breakpoints.down('sm')]: {
                        padding: '0',
                    },
                }}
            >
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box
                        display={{
                            xs: 'block',
                            md: 'none',
                        }}
                    >
                        <ImageContainer />
                    </Box>

                    <Typography margin={'0 8px'}>{grocery.name}</Typography>
                    <Typography>
                        {currencyFormatter.from(totalPrice).toString()}
                    </Typography>
                </Stack>

                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    mt={'24px'}
                >
                    <Button
                        variant={'outlined'}
                        color={'error'}
                        sx={{ fontSize: '13px' }}
                        onClick={() => removeGrocery(grocery.id)}
                    >
                        {removeItemButtonLabel}
                    </Button>

                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={'10px'}
                        border={'0.827068px solid #C9C9C9'}
                        borderRadius={'5px'}
                        padding={'5px'}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <StyledIconButton
                            sx={{
                                backgroundColor: '#7C8694',
                                opacity: 0.5,
                            }}
                            onClick={() => removeGrocery(grocery.id, 1)}
                        >
                            <AiOutlineMinus />
                        </StyledIconButton>
                        <Typography fontSize={'18px'} fontWeight={600}>
                            {amount}
                        </Typography>
                        <StyledIconButton
                            sx={{ backgroundColor: theme.palette.primary.main }}
                            onClick={() => addGrocery(grocery, 1)}
                        >
                            <AiOutlinePlus />
                        </StyledIconButton>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
