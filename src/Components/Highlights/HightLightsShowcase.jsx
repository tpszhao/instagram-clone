import React,{useRef} from 'react';
import styled,{css} from 'styled-components';
import {Carousel, ImageLazyLoader, ButtonIcon} from 'Components';
import nextIcon from 'SVG/next.svg';


const Container = styled.div`
    position:relative;
    display:flex;
    overflow:hidden;
    width:90vw;
    height:500px;
    max-height:80vh;
    max-width:100%;
`;

const pictureCarouselStyle = css`
    width:60%;
    height:100%;
`;

const infoCarouselStyle = css`
    width:25%;
    height:100%;
`;

const UserInfoCard = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
`;


const ButtonContainer = styled.div`
    display:flex;
    flex-direction:column;
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
                    <UserInfoCard key={photo.id}>
                        <ImageLazyLoader 
                            objectFit="scale-down"
                            src={photo.user.profile_image.large}/>
                        <span>Photo By {photo.user.name}</span>
                    </UserInfoCard>))}
            </Carousel>
            <ButtonContainer>
                <ButtonIcon 
                    {...buttonStyle}
                    rotate={45}
                    onClick={()=>closeModal()}/>
                <ButtonIcon 
                    {...buttonStyle}
                    src={nextIcon} 
                    onClick={previous} 
                    rotate={180}/>
                <ButtonIcon 
                    {...buttonStyle}
                    src={nextIcon} 
                    onClick={next}/>
            </ButtonContainer>
        </Container>
    )
}

