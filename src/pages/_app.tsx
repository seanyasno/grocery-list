import React from 'react';

import type { AppProps } from 'next/app';
import Script from 'next/script';

import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import { reportAccessibility } from '@/utils';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Heebo } from '@next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const heebo = Heebo({ subsets: ['hebrew'] });

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            {/* eslint-disable-next-line @next/next/inline-script-id */}
            <Script>
                {`
                    nl_pos = "bl";
                    nl_compact = "1";
                    nl_accordion = "1";
                `}
            </Script>
            <Script src={'/scripts/nagishli.js'} />
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    <main className={heebo.className}>
                        <QueryClientProvider client={queryClient}>
                            <Component {...pageProps} />
                        </QueryClientProvider>
                    </main>
                </ThemeProvider>
            </CacheProvider>
        </>
    );
};

// noinspection JSIgnoredPromiseFromCall
reportAccessibility(React);

export default App;
