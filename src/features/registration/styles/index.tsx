import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';

export const Background = styled(Box)`
    width: 100%;
    height: 100vh;
    background-color: #232f3e;
    padding: 54px 117px;
    ${theme.breakpoints.down('md')} {
        padding: 0;
        height: unset;
    }
`;

export const FormCard = styled(Box)`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
            270deg,
            #ff9a00 44.92%,
            rgba(255, 154, 0, 0.68) 100%
        ),
        url('/images/karsten-winegeart-4bC1Ef88OYI-unsplash 1.webp');
    border-radius: 30px;
    background-repeat: no-repeat;
    background-size: auto 100%;
    padding: 50px 62px;
    display: flex;
    ${theme.breakpoints.down('md')} {
        border-radius: 0;
        background-image: linear-gradient(
                270deg,
                #ff9a00 -23.83%,
                rgba(255, 154, 0, 0.68) 100%
            ),
            url('/images/karsten-winegeart-4bC1Ef88OYI-unsplash 1.webp');
        background-size: cover;
        height: 367px;
    }
`;

export const SubmitButton = styled(Button)`
    margin: 38px 0;
    font-size: 22px;
    padding: 10px 0;
`;

export const FilledTextField = styled(TextField)`
    & .MuiInputBase-root,
    .MuiInputBase-root.Mui-focused {
        background-color: #feb74a;
        color: #000;
        font-size: 16px;
        border-radius: 6px;
        border-bottom: none;
    }

    & .MuiInputLabel-root,
    .MuiInputLabel-root.Mui-focused {
        color: #232f3e;
    }

    & .MuiInputLabel-shrink {
        font-size: 18px;
    }
`;

export const Title = styled(Typography)`
    color: #fff;
    font-size: 44px;
    margin-bottom: 18px;
    font-weight: 400;

    ${theme.breakpoints.down('md')} {
        font-size: 24px;
        font-weight: 600;
    }
`;

export const SocialIconButton = styled(IconButton)`
    background-color: #fff;
    border: 1px solid #e0e0e9;
    box-shadow: 0px 18px 30px rgba(131, 119, 198, 0.11);
    border-radius: 15px;

    &.MuiIconButton-root:hover {
        background-color: #ffffffaa;
        border: 1px solid #e0e0e9aa;
    }
`;
