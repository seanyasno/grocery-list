import React from 'react';

import { BiMenuAltLeft } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { FiShoppingCart } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiUser3Line } from 'react-icons/ri';
import { TbClipboardList } from 'react-icons/tb';

import { SearchBar } from '@/features/groceries-search';
import { theme } from '@/styles/theme';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';

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
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position={'relative'} color={'default'} elevation={1}>
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        sx={{
                            display: { xs: 'flex', sm: 'none' },
                            padding: 0,
                        }}
                    >
                        <CiSearch
                            color={theme.palette.primary.main}
                            size={24}
                        />
                    </IconButton>

                    <Typography
                        variant={'h6'}
                        noWrap
                        component={'a'}
                        href={'/'}
                        color={'primary'}
                        fontWeight={800}
                        sx={{ textDecoration: 'none' }}
                    >
                        כותרת גדולה
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexGrow: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <SearchBar />
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                        }}
                    >
                        {pages.map(({ title, href, icon }, index) => (
                            <React.Fragment key={index}>
                                <Button
                                    onClick={handleCloseNavMenu}
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
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{ padding: 0 }}
                        >
                            <BiMenuAltLeft color={theme.palette.primary.main} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(({ title }, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
