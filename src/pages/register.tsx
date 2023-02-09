import React from 'react';

import { NextPage } from 'next';

import styled from '@emotion/styled';
import { Box } from '@mui/material';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #232f3e;
    padding: 54px 117px;
`;

const Card = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
            90deg,
            #ff9a00 44.92%,
            rgba(255, 154, 0, 0.68) 100%
        ),
        url('/images/karsten-winegeart-4bC1Ef88OYI-unsplash 1.png');
    border-radius: 30px;
    transform: scaleX(-1);
    background-repeat: no-repeat;
    background-position-x: left;
`;

const CardLayer = styled.div`
    background: linear-gradient(
        90deg,
        #ff9a00 44.92%,
        rgba(255, 154, 0, 0.68) 100%
    );
    position: absolute;
    width: 100%;
    height: 100%;
`;

const Register: NextPage = () => {
    return (
        <Background>
            <Card>{/*<CardLayer></CardLayer>*/}</Card>
        </Background>
    );
};

export default Register;
