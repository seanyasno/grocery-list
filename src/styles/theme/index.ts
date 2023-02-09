import { createTheme } from '@mui/material';

export const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#FF9A00',
        },
        secondary: {
            main: '#232F3E',
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
                    },
                },
            ],
        },
    },
});
