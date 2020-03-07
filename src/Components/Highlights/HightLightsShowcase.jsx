import React,{useRef} from 'react';
import styled,{css} from 'styled-components';
import { Link } from "react-router-dom";
import {Carousel, ImageLazyLoader, ButtonIcon} from 'Components';
import nextIcon from 'SVG/next.svg';


const Container = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    width:70vw;
    height:500px;
    max-height:80vh;
    max-width:100%;
`;

const pictureCarouselStyle = css`
    width:100%;
    height:calc(100% - 60px);
`;

const infoCarouselStyle = css`
    width:100%;
    height: 60px;
`;

const UserInfo = styled(Link)`
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    text-decoration: none;
`;

const ProfileImage = styled.img`
    margin: 5px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

const UserName = styled.span`
    text-decoration: none;
    color: black;
`;

const ButtonContainer = styled.div`
    display:flex;
    position:absolute;
    right:0;
    bottom:0;
`;

const buttonStyle={
    width:'40px',
    height:'40px'
}


export default function HightLightsShowcase({photoList,closeModal}) {
    const pictureCarousel = useRef(null);
    const infoCarousel = useRef(null);

    const next=()=>{
        pictureCarousel.current.slickNext();
        infoCarousel.current.slickNext();
    }

    const previous=()=>{
        pictureCarousel.current.slickPrev();
        infoCarousel.current.slickPrev();
    }
    return (
        <Container>
            <Carousel
                reference={pictureCarousel}
                containerCSS={pictureCarouselStyle}>
                {photoList.map(photo=>(
                    <ImageLazyLoader 
                        key={photo.id}
                        objectFit="scale-down"
                        src={photo.urls.regular}
                        placeholderColor={photo.color}/>))}
            </Carousel>
            <Carousel
                vertical
                reference={infoCarousel}
                containerCSS={infoCarouselStyle}>
                {photoList.map(photo=>(
                    <UserInfo key={photo.id} to={`/user/${photo.user.username}`}>
                        <ProfileImage 
                            src={photo.user.profile_image.medium}
                            alt="avatar"/>
                        <UserName>{photo.user.name}</UserName>
                    </UserInfo>))}
            </Carousel>
            <ButtonContainer>
                <ButtonIcon 
                    {...buttonStyle}
                    src={nextIcon} 
                    onClick={previous} 
                    rotate={180}/>
                <ButtonIcon 
                    {...buttonStyle}
                    src={nextIcon} 
                    onClick={next}/>
                <ButtonIcon 
                    {...buttonStyle}
                    rotate={45}
                    onClick={()=>closeModal()}/>
            </ButtonContainer>
        </Container>
    )
}

