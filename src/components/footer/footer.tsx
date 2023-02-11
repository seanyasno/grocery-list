import React from 'react';

import { BsTelephone } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

import { theme } from '@/styles/theme';
import { Box, Container, Grid, Typography } from '@mui/material';

export const Footer: React.FC = () => {
    const companyName = 'כותרת גדולה';
    const phoneNumber = '054-123-4567';

    return (
        <Grid
            container
            component={'footer'}
            bgcolor={theme.palette.secondary.main}
            padding={'80px 120px'}
        >
            <Grid item xs={12} md={4}>
                <Typography
                    color={'primary'}
                    fontWeight={800}
                    fontSize={'22px'}
                >
                    {companyName}
                </Typography>

                <Typography
                    fontSize={'20px'}
                    color={'white'}
                    mt={'30px'}
                    mb={'20px'}
                >
                    צור קשר
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '4px',
                    }}
                >
                    <FaWhatsapp color={'white'} size={20} />
                    <Typography
                        display={'inline'}
                        fontSize={'16px'}
                        color={'white'}
                    >
                        וואטסאפ
                    </Typography>
                </Box>

                <Typography color={'white'} fontSize={'16px'}>
                    {phoneNumber}
                </Typography>

                <Box sx={{ height: '14px' }} />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '4px',
                    }}
                >
                    <BsTelephone color={'white'} size={20} />
                    <Typography
                        display={'inline'}
                        fontSize={'16px'}
                        color={'white'}
                    >
                        התקשרו אלינו
                    </Typography>
                </Box>

                <Typography color={'white'} fontSize={'16px'}>
                    {phoneNumber}
                </Typography>
            </Grid>
        </Grid>
    );
};
