import React, { useContext, useMemo } from 'react';

import { GiPriceTag } from 'react-icons/gi';

import { ShoppingCartContext } from '@/contexts';
import { theme } from '@/styles/theme';
import { currencyFormatter } from '@/utils';
import styled from '@emotion/styled';
import { Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';

const Container = styled.div`
    background: rgba(255, 154, 0, 0.14);
    border-radius: 10px;
    padding: 22px;
`;

export const PriceComparison: React.FC = () => {
    const { cart, getTopCheapestChainStore } = useContext(ShoppingCartContext);

    const { data: topCheapestStores } = useQuery({
        queryKey: ['top-cheapest-stores', cart],
        queryFn: async () => {
            try {
                const chains = await getTopCheapestChainStore(3);
                return chains.flatMap((chain) =>
                    Object.values(chain)
                        .flatMap((store) => Object.values(store))
                        .flatMap((itemMap) => ({
                            chainName: Object.values(
                                Object.values(itemMap)[1]
                            )?.[0]?.chainName,
                            storeName: Object.values(
                                Object.values(itemMap)[1]
                            )?.[0]?.storeName,
                            totalPrice: Object.values(itemMap)[0],
                            items: Object.values(itemMap)[1],
                        }))
                );
            } catch (error) {
                console.error(error);
                return [];
            }
        },
        enabled: !isEmpty(cart),
    });

    const title = 'השוואת מחירים';

    return (
        <Container>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <GiPriceTag size={24} color={theme.palette.primary.main} />
                <Typography
                    color={'primary'}
                    fontWeight={600}
                    fontSize={'20px'}
                >
                    {title}
                </Typography>
            </Stack>
            <Divider sx={{ margin: '12px 0' }} />
            <Stack>
                {topCheapestStores?.map((chain, index) => (
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        key={index}
                    >
                        <Typography>
                            {chain.chainName + ' ' + chain.storeName}
                        </Typography>
                        <Typography>
                            {currencyFormatter
                                .from(Number(chain.totalPrice ?? '0'))
                                ?.toString()}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Container>
    );
};
