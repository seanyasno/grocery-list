import React, { useCallback, useContext } from 'react';

import { TiDelete } from 'react-icons/ti';

import { CartItem } from '@/abstraction';
import { ShoppingCartContext } from '@/contexts';
import { currencyFormatter } from '@/utils';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

type Props = {
    cartItem: CartItem;
};

export const LiveBillItem: React.FC<Props> = (props) => {
    const { cartItem } = props;
    const { removeGrocery } = useContext(ShoppingCartContext);

    const handleOnDelete = useCallback(() => {
        removeGrocery(cartItem.grocery.id);
    }, [cartItem, removeGrocery]);

    return (
        <>
            <Stack
                direction={'row'}
                sx={{
                    width: '100%',
                }}
            >
                <Grid container mt={'24px'}>
                    <Grid item xs={6}>
                        <Stack
                            direction={'column'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            height={'100%'}
                        >
                            <Typography
                                color={'secondary'}
                                fontWeight={500}
                                fontSize={'15px'}
                                lineHeight={0.75}
                                paddingRight={'10px'}
                            >
                                {cartItem.grocery.name}
                            </Typography>
                            <Typography
                                color={'#7C8694'}
                                fontWeight={500}
                                fontSize={'12px'}
                                lineHeight={1}
                            >
                                סה״כ מחיר
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack
                            direction={'column'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            height={'100%'}
                        >
                            <Typography
                                color={'secondary'}
                                fontWeight={600}
                                fontSize={'13px'}
                                lineHeight={1}
                            >
                                {cartItem.amount}
                                {'x'}
                                {currencyFormatter
                                    .from(cartItem.grocery.price)
                                    .toString()}
                            </Typography>
                            <Typography
                                color={'secondary'}
                                fontWeight={600}
                                fontSize={'15px'}
                                lineHeight={1}
                            >
                                {currencyFormatter
                                    .from(
                                        cartItem.amount * cartItem.grocery.price
                                    )
                                    .toString()}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>

                <Stack>
                    <Box
                        sx={{
                            justifyContent: 'flex-end',
                            padding: 0,
                            marginTop: '18px',
                            display: 'flex',
                            marginBottom: '8px',
                        }}
                    >
                        <IconButton
                            sx={{
                                padding: 0,
                            }}
                            onClick={handleOnDelete}
                        >
                            <TiDelete color={'#FF5960'} size={24} />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            height: '70px',
                            width: '70px',
                            backgroundColor: '#ededed',
                        }}
                    />
                </Stack>
            </Stack>
            <Divider
                sx={{
                    width: '100%',
                    marginTop: '20px',
                }}
            />
        </>
    );
};
