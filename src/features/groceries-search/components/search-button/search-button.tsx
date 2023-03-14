import React from 'react';

import { CiSearch } from 'react-icons/ci';

import { theme } from '@/styles/theme';
import { IconButton } from '@mui/material';

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SearchButton: React.FC<Props> = (props) => {
    const { onClick } = props;

    return (
        <IconButton
            sx={{
                display: { xs: 'flex', sm: 'none' },
                padding: 0,
            }}
            onClick={onClick}
        >
            <CiSearch color={theme.palette.primary.main} size={24} />
        </IconButton>
    );
};
