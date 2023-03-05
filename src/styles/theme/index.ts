import { createTheme } from '@mui/material';

export const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#FF9A00',
            contrastText: '#fff',
        },
        secondary: {
            main: '#232F3E',
        },
        error: {
            main: '#FA3434',
        },
        info: {
            main: '#7C8694',
        },
    },
    typography: {
        fontFamily: 'Heebo, sans-serif',
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'contained' },
                    style: {
                        borderRadius: '4px',
                        boxShadow: 'none',
                    },
                },
                {
                    props: { variant: 'text' },
                    style: {
                        color: '#666666',
                        textTransform: 'none',
                        fontWeight: 400,
                    },
                },
                {
                    props: { variant: 'outlined' },
                    style: {
                        border: '1px solid #DEE2E7',
                        boxShadow: '0px 1px 2px rgba(56, 56, 56, 0.08)',
                        borderRadius: '6px',
                    },
                },
            ],
        },
        MuiAppBar: {
            styleOverrides: {
                colorDefault: {
                    backgroundColor: '#fff',
                },
            },
        },
    },
});
