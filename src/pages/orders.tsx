import React, { useState } from 'react';

import { NextPage } from 'next';

import { Footer, ResponsiveAppBar } from '@/components';
import { FavoriteGroceriesProvider } from '@/contexts';
import { PreviousOrdersList, SavedOrdersList } from '@/features/orders';
import { Box, Tab, Tabs } from '@mui/material';

const OrdersPage: NextPage = () => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <Box>
            <ResponsiveAppBar />
            <Box
                sx={{
                    padding: '50px',
                }}
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={currentTab}
                        onChange={(event, newValue) => {
                            setCurrentTab(newValue);
                        }}
                        aria-label="basic tabs example"
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
                    hidden={currentTab !== 0}
                    style={{
                        paddingTop: '30px',
                    }}
                >
                    <FavoriteGroceriesProvider>
                        <SavedOrdersList
                            savedGroceries={[
                                {
                                    name: 'תפוח',
                                    price: 1.9,
                                    id: 'a',
                                },
                                {
                                    name: 'ענבים',
                                    price: 2.99,
                                    id: 'b',
                                },
                                {
                                    name: 'קוקה קולה',
                                    price: 3.0,
                                    id: 'c',
                                },
                                {
                                    name: 'מיץ תפוזים',
                                    price: 5.99,
                                    id: 'd',
                                },
                            ]}
                        />
                    </FavoriteGroceriesProvider>
                </div>
                <div
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
                                ],
                                orderDate: new Date(),
                                deliveryDate: new Date(),
                            },
                        ]}
                    />
                </div>
            </Box>
            <Footer />
        </Box>
    );
};

export default OrdersPage;
