import React from 'react'
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
    height: 60px;
    width: 100%;
`;

const Fade = keyframes`
    0% {
        opacity:0.5;
    }
    100%{
        opacity:1;
    }
`;

const Dot = styled.div`
    margin:2px;
    width:6px;
    height:6px;
    background-color:rgb(200,200,200);
    border-radius: 50%;
    animation: 1s ${Fade} linear;
    animation-iteration-count:infinite;
    animation-delay:${props => props.delay||'0.5s'};
`;

export default function CardLoader() {
    return (
        <Container>
            <Dot delay='0.4s'/>
            <Dot delay='0.8s'/>
            <Dot delay='1.2s'/>
            <Dot delay='1.6s'/>
        </Container>
    )
}
