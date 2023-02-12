import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { Box, Button, Card, Grid } from '@mui/material';

export const StyledCard = styled(Card)`
    border: 1px solid #ededed;
    border-radius: 18px;
    max-width: 320px;

    &:hover {
        box-shadow: 0px 97px 39px rgba(0, 0, 0, 0.01),
            0px 54px 33px rgba(0, 0, 0, 0.03), 0px 24px 24px rgba(0, 0, 0, 0.04),
            0px 6px 13px rgba(0, 0, 0, 0.05), 0px 0px 0px rgba(0, 0, 0, 0.05);
    }
`;

export const StyledAmount = styled(Box)`
    background-color: ${theme.palette.primary.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px 0 0 6px;

    ${theme.breakpoints.down('sm')} {
        border-radius: 6px 6px 0 0;
    }
`;

export const TempImage = styled.div`
    height: 240px;
    width: 100%;
    background-color: #ededed;
    ${theme.breakpoints.down('sm')} {
        height: 188px;
    }
`;

export const AddToCartButton = styled(Button)`
    height: 100%;
    box-shadow: none;
    border-radius: 0 6px 6px 0;

    ${theme.breakpoints.down('sm')} {
        border-radius: 0 0 6px 6px;
        padding: 10px;
    }
`;

export const BottomSectionGrid = styled(Grid)`
    padding: 20px;
    ${theme.breakpoints.down('sm')} {
        padding: 17px 14px;
    }
`;

export const InfoGrid = styled(Grid)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    ${theme.breakpoints.down('sm')} {
        margin-bottom: 8px;
    }
`;
