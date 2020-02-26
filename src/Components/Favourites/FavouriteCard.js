import React from 'react';
import styled from 'styled-components';
import Image from "react-graceful-image";
import {ButtonIcon} from 'Components'

const Container = styled.div`
    position:relative;
    text-align:center;
    margin:10px auto;
    width:calc(296px*0.9);
    height:296px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    @media only screen and (max-width: 976px){
        width:calc((100vw - 32px)/3);
        height:calc((100vw - 32px)/3);
        width:100%;
    }
`;

const Photo = styled(Image)`
    width: 90%;
    height: 80%;
    object-fit: cover;
`;

const BackGround = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    opacity:0;
    &:hover{
        opacity:1;
    }
`;




export default function FavouriteCard({card,deleteCard}) {
    return (
        <Container>
            <span>{card.keyword}</span>
            <Photo 
                src={card.photo.urls.regular} 
                placeholderColor={card.photo.color}
                alt="placeholder"/>
            <BackGround>
                <ButtonIcon 
                    rotate={45}
                    style={{top:'2px',right:'12px'}}
                    onClick={()=>deleteCard(card)}/>
            </BackGround>
        </Container>
    )
}
