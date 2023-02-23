import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import { FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { ShoppingCartContext } from '@/contexts';
import { LiveBillList } from '@/features/live-bill';
import { currencyFormatter } from '@/utils';
import styled from '@emotion/styled';
import {
    Box,
    Button,
    Collapse,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

export const StyledExpandButton = styled(IconButton)`
    position: absolute;
    left: 50%;
    top: -30px;
    transform: translateX(-50%);
    background-color: #f8f8f8;
    border: 8px solid #ffffff;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.11);
    z-index: 1;

    &:hover {
        z-index: 1;
        background-color: #f8f8f8;
    }
`;

export const StyledContainer = styled.div<{ expanded: boolean }>`
    position: relative;
    display: flex;
    width: max-content;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.11);
    border-radius: 16px;
    padding: ${({ expanded }) => (expanded ? '25px 25px 0 25px' : '25px')};
    max-width: 395px;
    min-width: 395px;
    height: ${({ expanded }) => (expanded ? '80vh' : 'unset')};
    flex-direction: column;
    overflow-y: auto;
`;

type Props = {
    expanded?: boolean;
    onExpandClick?: () => void;
};

export const LiveBillCard: React.FC<Props> = (props) => {
    const { expanded, onExpandClick } = props;
    const { totalPrice } = useContext(ShoppingCartContext);
    const router = useRouter();

    const buttonLabel = 'ללכת לעגלה';

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <StyledExpandButton color={'primary'} onClick={onExpandClick}>
                {expanded ? (
                    <IoIosArrowUp size={22} />
                ) : (
                    <IoIosArrowDown size={22} />
                )}
            </StyledExpandButton>

            <StyledContainer expanded={expanded}>
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    display={'flex'}
                    sx={{ width: '100%' }}
                >
                    <Stack display={'flex'}>
                        <Typography
                            color={'#7C8694'}
                            sx={{ lineHeight: '20px' }}
                        >
                            שווי עגלת קניות
                        </Typography>
                        <Typography
                            color={'primary'}
                            fontSize={'22px'}
                            fontWeight={600}
                            sx={{ lineHeight: '28px' }}
                        >
                            {currencyFormatter.from(totalPrice)?.toString()}
                        </Typography>
                    </Stack>

                    <Button
                        variant={'contained'}
                        sx={{
                            columnGap: '10px',
                            display: 'flex',
                            boxShadow: 'none',
                            fontWeight: 600,
                            height: 'max-content',
                            padding: '10px 20px',
                        }}
                        onClick={() => router.push('/checkout')}
                    >
                        <FiShoppingCart size={22} />
                        {buttonLabel}
                    </Button>
                </Stack>

                <Collapse
                    in={expanded}
                    timeout={'auto'}
                    unmountOnExit
                    sx={{
                        height: '100%',
                        flexGrow: 1,
                        flex: 1,
                        display: 'flex',
                    }}
                >
                    <LiveBillList />
                </Collapse>
            </StyledContainer>
        </Box>
    );
};
