import React from 'react';

import Image from 'next/image';

import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { Box, IconButton, Typography } from '@mui/material';

export const StyledIconButton = styled(IconButton)`
    width: 92px;
    height: 92px;
    background-color: #f5f5f5;
    &:hover {
        border: 1px solid ${theme.palette.primary.main};

        box-shadow: 4px 40px 16px rgba(0, 0, 0, 0.01),
            2px 22px 13px rgba(0, 0, 0, 0.03), 1px 10px 10px rgba(0, 0, 0, 0.04),
            0px 2px 5px rgba(0, 0, 0, 0.05), 0px 0px 0px rgba(0, 0, 0, 0.05);
    }
`;

type Props = {
    name: string;
    imageSrc: string;
};

export const GroceryCategoryItem: React.FC<Props> = (props) => {
    const { name, imageSrc } = props;

    return (
        <Box>
            <StyledIconButton aria-label={`כפתור של קטגוריית ${name}`}>
                <Image
                    src={imageSrc}
                    alt={name}
                    layout={'fill'}
                    style={{
                        padding: '16px',
                        objectFit: 'contain',
                    }}
                    sizes={'100%'}
                />
            </StyledIconButton>
            <Typography mt={'12px'} fontSize={'16px'} fontWeight={400}>
                {name}
            </Typography>
        </Box>
    );
};
