import React from 'react';

import { theme } from '@/styles/theme';
import { Box, Divider, Typography } from '@mui/material';

type Props = {
    title: string;
};

export const FooterTitle: React.FC<Props> = (props) => {
    const { title } = props;

    return (
        <Box
            sx={{
                width: 'max-content',
                marginBottom: '24px',
            }}
        >
            <Typography fontSize={'20px'} color={'primary'}>
                {title}
            </Typography>

            <Divider
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: '3px',
                    marginTop: '10px',
                }}
            />
        </Box>
    );
};
