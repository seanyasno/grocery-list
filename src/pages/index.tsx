import { useState } from 'react';

import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { Grocery } from '@/abstraction';
import { Footer, LoadingPage, ResponsiveAppBar } from '@/components';
import { auth } from '@/config';
import { FavoriteGroceriesProvider, ShoppingCartProvider } from '@/contexts';
import { GroceriesCategoriesList } from '@/features/groceries-categories';
import { GroceriesCardsList } from '@/features/grocery-item';
import { LiveBillCard } from '@/features/live-bill';
import { useUser } from '@/hooks';
import { fetchGrocery } from '@/requests/chp-requests/chp-requests';
import { theme } from '@/styles/theme';
import { groceryRequestFormatter } from '@/utils';
import {
    Box,
    Dialog,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {
    groceries: Grocery[];
};

const HomePage: NextPage<Props> = (props) => {
    const { groceries } = props;
    const [layout, setLayout] = useState(1);
    const [user, loadingUser] = useAuthState(auth);
    const [userData] = useUser(user?.uid);
    const [openBill, setOpenBill] = useState(false);
    const pageTitle = 'דף הבית של אתר קניות';

    if (isEmpty(groceries) || loadingUser) {
        return <LoadingPage />;
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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

            <ShoppingCartProvider>
                <FavoriteGroceriesProvider
                    uid={user?.uid}
                    initialFavoriteGroceriesIds={userData?.favoriteGroceries}
                    loadFromLocalStorage={false}
                >
                    <ResponsiveAppBar />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '20px',
                            minHeight: '60vh',
                            marginBottom: '60px',
                        }}
                    >
                        <Box
                            sx={{
                                [theme.breakpoints.up('sm')]: {
                                    padding: '30px',
                                },
                            }}
                        >
                            <Grid container columnSpacing={3}>
                                <Grid
                                    item
                                    xs={layout === 1 ? 12 : true}
                                    height={layout === 1 ? '100%' : '80vh'}
                                    overflow={layout === 1 ? 'unset' : 'auto'}
                                >
                                    <Grid
                                        container
                                        spacing={3}
                                        display={'flex'}
                                    >
                                        <Grid
                                            item
                                            xs={layout === 1 ? true : 12}
                                            flexGrow={1}
                                            flex={1}
                                        >
                                            <Box
                                                sx={{
                                                    marginBottom: '40px',
                                                    width: '100%',
                                                    display: 'flex',
                                                }}
                                            >
                                                <GroceriesCategoriesList />
                                            </Box>
                                        </Grid>

                                        {layout === 1 && (
                                            <Grid
                                                item
                                                display={{
                                                    xs: 'none',
                                                    md: 'block',
                                                }}
                                            >
                                                <LiveBillCard
                                                    onExpandClick={() =>
                                                        setLayout((prev) =>
                                                            prev === 1 ? 2 : 1
                                                        )
                                                    }
                                                />
                                            </Grid>
                                        )}

                                        <Grid item>
                                            <GroceriesCardsList
                                                groceries={groceries}
                                                shrink={layout !== 1}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {layout !== 1 && (
                                    <Grid
                                        item
                                        display={{ xs: 'none', md: 'block' }}
                                    >
                                        <LiveBillCard
                                            expanded={layout !== 1}
                                            onExpandClick={() =>
                                                setLayout((prev) =>
                                                    prev === 1 ? 2 : 1
                                                )
                                            }
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Box>

                        <IconButton
                            aria-label={
                                openBill
                                    ? 'סיגרת עגלת קניות'
                                    : 'פתיחת עגלת קניות'
                            }
                            sx={{
                                position: 'fixed',
                                left: 0,
                                top: '50%',
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: '0 20px 20px 0',
                                padding: '20px 0',
                                zIndex: 9999,
                                display: { xs: 'block', md: 'none' },
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                },
                            }}
                            onClick={() => setOpenBill((value) => !value)}
                        >
                            {openBill ? (
                                <IoIosArrowForward color={'#fff'} size={40} />
                            ) : (
                                <IoIosArrowBack color={'#fff'} size={40} />
                            )}
                        </IconButton>

                        <Dialog open={openBill} fullScreen>
                            <DialogTitle hidden>
                                רשימת מוצרים של עגלת קניות
                            </DialogTitle>
                            <Box
                                sx={{
                                    padding: '20px',
                                    display: 'flex',
                                    flex: 1,
                                    width: '100%',
                                }}
                            >
                                <LiveBillCard
                                    mobile
                                    expanded
                                    showExpandButton={false}
                                />
                            </Box>
                        </Dialog>
                    </Box>
                </FavoriteGroceriesProvider>
            </ShoppingCartProvider>

            <Footer />
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
    const barcodes = [
        '7290111564956',
        '7290115209198',
        '7290000288024',
        '2007975',
        '7290011017866',
        '7290110115296',
    ];

    try {
        const requests = barcodes.map((barcode) => fetchGrocery(barcode));
        const responses = await Promise.all(requests);
        const groceries = responses.map((response) =>
            groceryRequestFormatter(response.data)
        );

        return {
            props: {
                groceries,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                groceries: [],
            },
        };
    }
};
