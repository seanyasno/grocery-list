import React from 'react';

import Link from 'next/link';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
    topLabel?: string;
    bottomLabel?: string;
    bottomLinkLabel?: string;
    children?: React.ReactNode;
    href: string;
    labelColor?: string;
    bottomLinkColor?: string;
};

export const BottomSection: React.FC<Props> = (props) => {
    const {
        topLabel,
        bottomLabel,
        bottomLinkLabel,
        children,
        href,
        bottomLinkColor,
        labelColor,
    } = props;

    return (
        <Stack textAlign={'center'} spacing={3}>
            <Typography color={labelColor}>{topLabel}</Typography>

            {children}

            <Box
                sx={{
                    columnGap: '3px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    color={bottomLinkColor}
                    display={'inline'}
                    sx={{ textDecoration: 'none' }}
                >
                    {bottomLabel}
                </Typography>
                <Link
                    href={href}
                    style={{
                        color: bottomLinkColor ?? '#232F3E',
                    }}
                >
                    <Typography display={'inline'} color={bottomLinkColor}>
                        {bottomLinkLabel}
                    </Typography>
                </Link>
            </Box>
        </Stack>
    );
};
