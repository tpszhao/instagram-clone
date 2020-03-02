import React,{useState} from 'react'
import styled from 'styled-components'
import {LatestPhoto,HighlightsMenu} from 'Components'

const Container = styled.div`
    margin: auto;
    display: flex;
    position: relative;
    justify-content: center;
    @media only screen and (max-width: 976px){
        flex-direction: column-reverse;
        align-items: center;
    }
`;
const SideBar = styled.div`
    margin: 10px 16px;
    width:296px;
    height:100%;
    position: sticky;
    top:${props=>`${props.stickyPos?62-props.stickyPos:62}px`};
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 976px){
        position:relative;
        width:616px;
        top:0px;
        max-width:calc(100vw - 32px);
    }
`;


export default function HomePage() {
    const [stickyPos, setStickyPos] = useState(0);
    return (
        <Container>
            <LatestPhoto/>
            <SideBar stickyPos={stickyPos}>
                <HighlightsMenu setStickyPos={setStickyPos}/>
            </SideBar>
        </Container>
    )
}
