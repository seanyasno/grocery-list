import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { alpha, InputBase, TextField } from '@mui/material';

export const Search = styled('div')<{ fullWidth: boolean }>(
    ({ fullWidth }) => ({
        position: 'relative',
        borderRadius: '10px',
        backgroundColor: '#F8F8F8',
        '&:hover': {
            backgroundColor: alpha('#F8F8F8', 0.75),
        },
        marginRight: fullWidth ? 0 : theme.spacing(2),
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
        },
        width: fullWidth ? '100%' : '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    })
);

export const SearchIconWrapper = styled('div')(() => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const ListIconWrapper = styled('div')(() => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(() => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));
