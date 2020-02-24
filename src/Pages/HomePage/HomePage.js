import React from 'react'
import styles from './HomePage.module.css'
import styled from 'styled-components'
import {LatestPhoto} from 'Components'

const Container = styled.div`
    margin: auto;
    display: flex;
    position: relative;
    justify-content: center;
    @media only screen and (max-width: 585px){
        flex-direction: column-reverse;
        align-items: center;
    }
`;

const SideBar = styled.div`
    margin: 10px 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const SideItem = styled.div`
    width: 296px;
    height: 224px;
    border: 1px solid rgb(219,219,219);
    border-radius: 3px;
    position: sticky;
    top: 78px;
    @media only screen and (max-width: 585px){
        min-width: 100%;
    }
`;

export default function HomePage() {
    return (
        <Container>
            <LatestPhoto/>
            <SideBar>
                <SideItem>placeholder</SideItem>
            </SideBar>
        </Container>
    )
}
