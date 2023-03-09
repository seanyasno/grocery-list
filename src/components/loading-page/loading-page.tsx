import React from 'react';

import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { BounceLoader } from 'react-spinners';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoadingPage: React.FC = () => {
    return (
        <Container>
            <BounceLoader
                color={theme.palette.primary.main}
                loading={true}
                size={120}
            />
        </Container>
    );
};
