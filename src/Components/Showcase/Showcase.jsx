import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Carousel, ImageLazyLoader, ButtonIcon } from "Components";
import ShowcasePhotoInfo from './ShowcasePhotoInfo'
import { nextIcon } from "Assets/SVG";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 90vw;
  height: 90vh;
  max-width: 100%;
`;

const carouselStyle = css`
  width: 100%;
  height: calc(100% - 100px);
`;

const BottomContainer = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;

  background-color:${props=>props.theme.backgroundColor};
`;


const ToolBar = styled.div`
  width:100%;
  display:flex;
  justify-content:flex-end;
  padding: 8px;
  display:flex;
`;

const buttonStyle = {
  width: "24px",
  height: "24px"
};

export default function Showcase({ 
  initialSlide=0,
  photoList, 
  closeModal, 
  showUserAvatar=true 
}) {
  const pictureCarousel = useRef(null);
  const [slickIndex, setNextIndex] = useState(initialSlide);
  const [opacity, setOpacity] = useState(1);


  const next = () => {
    pictureCarousel.current.slickNext();
  };

  const previous = () => {
    pictureCarousel.current.slickPrev();
  };

  const beforeChange = (oldIndex,newIndex)=>{
    setOpacity(0);
    setTimeout(() => {
      setOpacity(1);
      setNextIndex(newIndex);
    }, 200);
  }

  return (
    <Container>
      <Carousel
        reference={pictureCarousel}
        containerCSS={carouselStyle}
        beforeChange={beforeChange}
        initialSlide={initialSlide}
        >
        {photoList.map(photo => (
          <ImageLazyLoader
            key={photo.id}
            objectFit="scale-down"
            src={photo.urls.regular}
            placeholderColor={photo.color}/>
        ))}
      </Carousel>
      <BottomContainer>
        <ShowcasePhotoInfo 
          opacity={opacity}
          showUserAvatar={showUserAvatar}
          photo={photoList[slickIndex]}/>
        <ToolBar>
          <ButtonIcon
            {...buttonStyle}
            src={nextIcon}
            onClick={previous}
            rotate={180}/>
          <ButtonIcon {...buttonStyle} src={nextIcon} onClick={next} />
          <ButtonIcon {...buttonStyle} rotate={45} onClick={() => closeModal()} />
        </ToolBar>
      </BottomContainer>
    </Container>
  );
}
