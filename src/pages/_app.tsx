import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Heebo } from '@next/font/google';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const heebo = Heebo({ subsets: ['hebrew'] });

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <main className={heebo.className}>
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default App;
