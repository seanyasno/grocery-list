import React from 'react';

import { Typography } from '@mui/material';

type Props = {
    title: string;
    href?: string;
};

export const FooterItem: React.FC<Props> = (props) => {
    const { title, href } = props;

    return (
        <Typography
            component={'a'}
            href={href}
            color={'white'}
            fontSize={'16px'}
            sx={{
                textDecoration: 'none',
                display: 'list-item',
                '&:hover': {
                    textDecoration: 'underline',
                    cursor: 'pointer',
                },
            }}
        >
            {title}
        </Typography>
    );
};
