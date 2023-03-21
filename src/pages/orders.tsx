import React, { useMemo, useState } from 'react';

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Footer, LoadingPage, ResponsiveAppBar } from '@/components';
import { auth } from '@/config';
import { FavoriteGroceriesProvider } from '@/contexts';
import { PreviousOrdersList, SavedOrdersList } from '@/features/orders';
import { useGroceryByBarcode, useUser } from '@/hooks';
import { theme } from '@/styles/theme';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ClipLoader } from 'react-spinners';

const OrdersPage: NextPage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [user, loadingUser] = useAuthState(auth);
    const [userData] = useUser(user?.uid);

    const { data: groceries, isLoading: loadingGroceries } =
        useGroceryByBarcode(userData?.favoriteGroceries);

    const router = useRouter();

    const pageTitle = 'דף הזמנות של אתר קניות';

    const loadingFavoriteGroceries = useMemo(() => {
        if (userData && isEmpty(userData?.favoriteGroceries)) {
            return false;
        }

        return loadingGroceries || loadingUser;
    }, [userData, loadingGroceries, loadingUser]);

    if (loadingUser && !user) {
        return <LoadingPage />;
    } else if (!user) {
        router.replace('/');
    }

    return (
        <>
            <Typography
                variant={'h1'}
                sx={{
                    position: 'absolute',
                    top: '-9999px',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                }}
            >
                {pageTitle}
            </Typography>
            <FavoriteGroceriesProvider
                uid={user?.uid}
                initialFavoriteGroceriesIds={userData?.favoriteGroceries}
                loadFromLocalStorage={false}
            >
                <ResponsiveAppBar />
                <Box
                    sx={{
                        padding: '0 20px 50px 20px',
                        [theme.breakpoints.up('sm')]: {
                            padding: '50px',
                        },
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={currentTab}
                            onChange={(event, newValue) => {
                                setCurrentTab(newValue);
                            }}
                            aria-label={'טאבים להזמנות ומוצרים'}
                        >
                            <Tab
                                value={0}
                                label={'מוצרים שמורים'}
                                id={`simple-tab-0`}
                                aria-controls={`simple-tabpanel-0`}
                            />
                            <Tab
                                value={1}
                                label={'היסטוריית הזמנות'}
                                id={`simple-tab-1`}
                                aria-controls={`simple-tabpanel-1`}
                            />
                        </Tabs>
                    </Box>
                    <div
                        role={'tabpanel'}
                        id={`simple-tabpanel-0`}
                        aria-labelledby={`simple-tab-0`}
                        hidden={currentTab !== 0}
                        style={{
                            paddingTop: '30px',
                        }}
                    >
                        {groceries && (
                            <SavedOrdersList savedGroceries={groceries} />
                        )}

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            {loadingFavoriteGroceries ? (
                                <ClipLoader
                                    color={theme.palette.primary.main}
                                    size={150}
                                />
                            ) : (
                                (isEmpty(userData?.favoriteGroceries) ||
                                    groceries?.length === 0) && (
                                    <Image
                                        alt={'empty favorites'}
                                        src={'./svgs/undraw_empty_re_opql.svg'}
                                        height={300}
                                        width={300}
                                    />
                                )
                            )}
                        </Box>
                    </div>
                    <div
                        role={'tabpanel'}
                        id={`simple-tabpanel-1`}
                        aria-labelledby={`simple-tab-1`}
                        hidden={currentTab !== 1}
                        style={{
                            paddingTop: '30px',
                        }}
                    >
                        <PreviousOrdersList
                            historyCarts={[
                                {
                                    id: 'CPY-12254412-2157788',
                                    cart: [
                                        {
                                            grocery: {
                                                name: 'קוקה קולה',
                                                price: 3.0,
                                                id: 'c',
                                            },
                                            amount: 2,
                                        },
                                        {
                                            grocery: {
                                                name: 'מיץ תפוזים',
                                                price: 5.99,
                                                id: 'd',
                                            },
                                            amount: 5,
                                        },
                                        {
                                            grocery: {
                                                name: 'נייר טואלט סופט גלילים',
                                                price: 99,
                                                id: 'ק',
                                            },
                                            amount: 5,
                                        },
                                    ],
                                    orderDate: new Date(),
                                    deliveryDate: new Date(),
                                },
                            ]}
                        />
                    </div>
                </Box>
                <Footer />
            </FavoriteGroceriesProvider>
        </>
    );
};

export default OrdersPage;
