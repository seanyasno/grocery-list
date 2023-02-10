import React from 'react';

import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { FiShoppingCart } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiUser3Line } from 'react-icons/ri';
import { TbClipboardList } from 'react-icons/tb';

import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import {
    alpha,
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';

const Search = styled('div')(() => ({
    position: 'relative',
    borderRadius: '10px',
    backgroundColor: '#F8F8F8',
    '&:hover': {
        backgroundColor: alpha('#F8F8F8', 0.75),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
    },
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const SearchIconWrapper = styled('div')(() => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ListIconWrapper = styled('div')(() => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    // position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(() => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

type PageItem = {
    title: string;
    icon: React.ReactNode;
};

const pages: PageItem[] = [
    {
        title: 'רשימת קניות',
        icon: <TbClipboardList color={theme.palette.primary.main} size={20} />,
    },
    {
        title: 'התחברות',
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
        icon: <FiShoppingCart color={theme.palette.primary.main} size={20} />,
    },
];

export const ResponsiveAppBar: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position={'static'} color={'default'} elevation={1}>
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
                        <Search>
                            <SearchIconWrapper>
                                <CiSearch
                                    color={theme.palette.primary.main}
                                    size={20}
                                />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="חפש מוצרים…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <ListIconWrapper>
                                <AiOutlineUnorderedList
                                    color={theme.palette.primary.main}
                                    size={20}
                                />
                            </ListIconWrapper>
                        </Search>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                        }}
                    >
                        {pages.map(({ title, icon }, index) => (
                            <>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    variant={'text'}
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        columnGap: '8px',
                                    }}
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
                            </>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            // flexGrow: 1,
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
