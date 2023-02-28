import React from 'react';

import { BsTelephone } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

import { FooterItem, FooterTitle } from '@/components/footer/components';
import { theme } from '@/styles/theme';
import { Box, Grid, Stack, Typography } from '@mui/material';

export const Footer: React.FC = () => {
    const companyName = 'כותרת גדולה';
    const phoneNumber = '054-123-4567';

    return (
        <Grid
            container
            component={'footer'}
            bgcolor={theme.palette.secondary.main}
            padding={'40px 120px'}
            rowSpacing={6}
            sx={{
                [theme.breakpoints.down('md')]: {
                    padding: '0px 60px 40px 60px',
                },
            }}
            mt={'10px'}
        >
            <Grid item xs={12} sm={4}>
                <Typography
                    color={'primary'}
                    fontWeight={800}
                    fontSize={'26px'}
                >
                    {companyName}
                </Typography>

                <Typography
                    fontSize={'20px'}
                    color={'white'}
                    mt={'20px'}
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

            <Grid item xs={12} sm={4}>
                <FooterTitle title={'אודות השירות'} />

                <Stack spacing={1} ml={'14px'}>
                    <FooterItem title={'תקנון ותנאי השימוש'} />
                    <FooterItem title={'מדיניות פרטיות'} />
                </Stack>
            </Grid>

            <Grid item xs={12} sm={4}>
                <FooterTitle title={'קטגוריות פופלואריות'} />

                <Stack spacing={1} ml={'14px'}>
                    <FooterItem title={'פירות'} />
                    <FooterItem title={'ירקות'} />
                    <FooterItem title={'חלב וביצים'} />
                    <FooterItem title={'בשר ודגים'} />
                    <FooterItem title={'קפואים'} />
                </Stack>
            </Grid>
        </Grid>
    );
};
