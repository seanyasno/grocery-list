import React, { useState } from 'react';

import { NextPage } from 'next';

import { Footer, ResponsiveAppBar } from '@/components';
import { SavedOrdersList } from '@/features/orders';
import { Box, Tab, Tabs } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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
                    <SavedOrdersList
                        savedGroceries={[
                            {
                                name: 'תפוח',
                                price: 1.9,
                                id: 'a',
                            },
                            {
                                name: 'תפוח',
                                price: 1.9,
                                id: 'a',
                            },
                            {
                                name: 'תפוח',
                                price: 1.9,
                                id: 'a',
                            },
                            {
                                name: 'תפוח',
                                price: 1.9,
                                id: 'a',
                            },
                        ]}
                    />
                </div>
                {/*<TabPanel value={value} index={1}>*/}
                {/*    Item Two*/}
                {/*</TabPanel>*/}
                {/*<TabPanel value={value} index={2}>*/}
                {/*    Item Three*/}
                {/*</TabPanel>*/}
            </Box>
            <Footer />
        </Box>
    );
};

export default OrdersPage;
