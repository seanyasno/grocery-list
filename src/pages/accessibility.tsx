import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { Footer, ResponsiveAppBar } from '@/components';
import { Box, Typography } from '@mui/material';

const AccessibilityPage: NextPage = () => {
    const pageTitle = 'דף הצהרת נגישות של אתר קניות';
    const titleLabel = 'הצהרת נגישות';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <ResponsiveAppBar />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    padding: '20px',
                    minHeight: '60vh',
                    margin: '60px 40px 20px 40px',
                }}
            >
                <Typography variant={'h1'} fontSize={'42px'} fontWeight={500}>
                    {titleLabel}
                </Typography>
                <Typography variant={'body1'}>
                    אתר זה עומד בדרישות תקנות שיוויון זכויות לאנשים עם מוגבלות
                    (התאמות נגישות לשירות), התשע”ג 2013. התאמות הנגישות בוצעו
                    עפ”י המלצות התקן הישראלי (ת”י 5568) לנגישות תכנים באינטרנט
                    ברמת AA ומסמך WCAG2.0 הבינלאומי. הבדיקות נבחנו לתאימות
                    הגבוהה ביותר עבור דפדפן CHROME.
                </Typography>
                <Typography variant={'body1'}>
                    אם מצאתם בעיה או תקלה, נשמח לקבל משוב ולטפל בפניתך.
                </Typography>
            </Box>

            <Footer />
        </>
    );
};

export default AccessibilityPage;
