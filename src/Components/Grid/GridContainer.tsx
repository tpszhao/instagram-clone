import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 20px;
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, calc((100% - 16px)/3));
    width: 100%;
`;


export default function GridContainer({children}:any) {
    return (
        <Container>
            {children}
        </Container>
    )
}
