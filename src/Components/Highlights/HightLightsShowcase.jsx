import React,{useRef} from 'react';
import styled,{css} from 'styled-components';
import {Carousel, ImageLazyLoader} from 'Components';


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
    width:70%;
    height:100%;
`;

const infoCarouselStyle = css`
    width:30%;
    height:100%;
`;

const ButtonContainer = styled.div`
    position:absolute;
    bottom:0;
    left:0;
`;



export default function HightLightsShowcase({photoList}) {
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
                    <ImageLazyLoader 
                        key={photo.id}
                        objectFit="scale-down"
                        src={photo.urls.regular}
                        placeholderColor={photo.color}/>))}
            </Carousel>
            <ButtonContainer>
                <button onClick={previous}>previous</button>
                <button onClick={next}>next</button>
            </ButtonContainer>
        </Container>
    )
}

