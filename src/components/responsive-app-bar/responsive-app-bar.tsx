import React, { useCallback, useState } from 'react';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';
import { FiPower } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiUser3Line } from 'react-icons/ri';
import { TbClipboardList } from 'react-icons/tb';

import { auth } from '@/config';
import { SearchBar, SearchButton } from '@/features/groceries-search';
import { theme } from '@/styles/theme';
import {
    AppBar,
    Box,
    Button,
    Container,
    Dialog,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

type PageItem = {
    title: string;
    href?: string;
    icon: React.ReactNode;
};

const pages: PageItem[] = [
    {
        title: 'רשימת קניות',
        href: '/orders',
        icon: <TbClipboardList color={theme.palette.primary.main} size={20} />,
    },
    {
        title: 'התחברות',
        href: '/login',
        icon: <RiUser3Line color={theme.palette.primary.main} size={20} />,
    },
    {
        title: 'הגדרות',
        icon: (
            <IoSettingsOutline color={theme.palette.primary.main} size={20} />
        ),
    },
    {
        title: 'עגלה',
        href: '/checkout',
        icon: <FiShoppingCart color={theme.palette.primary.main} size={20} />,
    },
];

export const ResponsiveAppBar: React.FC = () => {
    const [user] = useAuthState(auth);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [showSearch, setShowSearch] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const titleLabel = 'כותרת גדולה';
    const welcomeBackLabel = 'ברוך שובך';
    const logoutButtonLabel = 'התנתק';

    const handleLogout = useCallback(async () => {
        await auth.signOut();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position={'relative'} color={'default'} elevation={1}>
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {!showSearch && (
                        <>
                            <SearchButton onClick={() => setShowSearch(true)} />

                            <Typography
                                variant={'h6'}
                                noWrap
                                component={'a'}
                                href={'/'}
                                color={'primary'}
                                fontWeight={800}
                                sx={{ textDecoration: 'none' }}
                            >
                                {titleLabel}
                            </Typography>
                        </>
                    )}

                    <Box
                        sx={{
                            display: {
                                xs: showSearch ? 'flex' : 'none',
                                sm: 'flex',
                            },
                            flexGrow: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <SearchBar
                            fullWidth={!matches}
                            showDelete={!matches}
                            onDelete={() => setShowSearch(false)}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                        }}
                    >
                        {pages.map(({ title, href, icon }, index) => {
                            if (title === 'התחברות' && user) {
                                return <React.Fragment key={index} />;
                            }

                            return (
                                <React.Fragment key={index}>
                                    <Button
                                        variant={'text'}
                                        sx={{
                                            my: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            columnGap: '8px',
                                        }}
                                        href={href}
                                    >
                                        {icon}
                                        {title}
                                    </Button>
                                    {index !== pages.length - 1 && (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: '24px',
                                                height: '0px',
                                                border: '1px solid #D9D9D9',
                                                transform: 'rotate(90deg)',
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        {!showSearch && (
                            <IconButton
                                onClick={() => setOpenMenu((value) => !value)}
                                sx={{ padding: 0 }}
                            >
                                <BiMenuAltLeft
                                    color={theme.palette.primary.main}
                                />
                            </IconButton>
                        )}

                        <Dialog
                            open={openMenu}
                            fullScreen={true}
                            sx={{
                                zIndex: 99999,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '30px 10px 30px 20px',
                                }}
                            >
                                <Typography
                                    fontSize={'28px'}
                                    color={'primary'}
                                    fontWeight={800}
                                >
                                    {titleLabel}
                                </Typography>
                                <IconButton onClick={() => setOpenMenu(false)}>
                                    <AiOutlineCloseCircle
                                        color={theme.palette.primary.main}
                                        size={24}
                                    />
                                </IconButton>
                            </Box>

                            {user && (
                                <Container
                                    sx={{
                                        backgroundColor:
                                            theme.palette.secondary.main,
                                        padding: '14px 20px',
                                    }}
                                >
                                    <Typography
                                        color={theme.palette.info.main}
                                        fontSize={'14px'}
                                        fontWeight={400}
                                    >
                                        {welcomeBackLabel}
                                    </Typography>
                                    <Typography
                                        color={'primary'}
                                        fontSize={'20px'}
                                        fontWeight={600}
                                    >
                                        {user?.displayName}!
                                    </Typography>
                                </Container>
                            )}

                            <Container
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    marginTop: '14px',
                                }}
                            >
                                {pages.map(({ title, href, icon }, index) => {
                                    if (title === 'התחברות' && user) {
                                        return <React.Fragment key={index} />;
                                    }

                                    return (
                                        <Button
                                            key={index}
                                            variant={'text'}
                                            sx={{
                                                my: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                columnGap: '8px',
                                            }}
                                            href={href}
                                        >
                                            {icon}
                                            {title}
                                        </Button>
                                    );
                                })}
                            </Container>

                            {user && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flex: 1,
                                        alignItems: 'flex-end',
                                        padding: '18px',
                                    }}
                                >
                                    <Button
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            columnGap: '8px',
                                        }}
                                        onClick={handleLogout}
                                    >
                                        <FiPower
                                            color={theme.palette.primary.main}
                                            size={20}
                                        />
                                        <Typography color={'primary'}>
                                            {logoutButtonLabel}
                                        </Typography>
                                    </Button>
                                </Box>
                            )}
                        </Dialog>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
