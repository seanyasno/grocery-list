import React from 'react';

import Link from 'next/link';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
    topLabel?: string;
    bottomLabel?: string;
    bottomLinkLabel?: string;
    children?: React.ReactNode;
    href: string;
};

export const BottomSection: React.FC<Props> = (props) => {
    const { topLabel, bottomLabel, bottomLinkLabel, children, href } = props;

    return (
        <Stack textAlign={'center'} spacing={3}>
            <Typography>{topLabel}</Typography>

            {children}

            <Box
                sx={{
                    columnGap: '3px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography display={'inline'} sx={{ textDecoration: 'none' }}>
                    {bottomLabel}
                </Typography>
                <Link
                    href={href}
                    style={{
                        color: '#232F3E',
                    }}
                >
                    <Typography display={'inline'}>
                        {bottomLinkLabel}
                    </Typography>
                </Link>
            </Box>
        </Stack>
    );
};
