import React, { useState } from 'react';

import { NextPage } from 'next';

import { Footer, ResponsiveAppBar } from '@/components';
import { FavoriteGroceriesProvider } from '@/contexts';
import { SavedOrdersList } from '@/features/orders';
import { Box, Tab, Tabs } from '@mui/material';

const OrdersPage: NextPage = () => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <FavoriteGroceriesProvider>
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
                    </div>
                </Box>
                <Footer />
            </Box>
        </FavoriteGroceriesProvider>
    );
};

export default OrdersPage;
