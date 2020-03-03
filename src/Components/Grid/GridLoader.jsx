import React from 'react'
import styled, { keyframes } from 'styled-components'

const Cell = styled.div`
    width: calc((100vw - 16px)/3);
    max-width: calc((936px - 16px)/3);
    height: calc((100vw - 16px)/3);
    max-height: calc((936px - 16px)/3);
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Rotation = keyframes`
    0%{
        transform: rotate(0deg);
        opacity:0;
    }
    50%{
        transform: rotate(180deg);
        opacity:1;
    }
    100%{
        transform: rotate(360deg);
        opacity:0;
    }
`;

const Spinner = styled.div`
    width:80%;
    height:80%;
    border-radius:50%;
    border: 15px solid rgb(200,200,200);
    border-left: 15px solid rgba(230,230,230,0.5);
    border-right: 15px solid rgba(230,230,230,0.5);
    animation: 2s ${Rotation} linear;
    animation-iteration-count:infinite;
`;

export default function GridLoader() {
    return (
        <Cell>
            <Spinner />
        </Cell>
    )
}
