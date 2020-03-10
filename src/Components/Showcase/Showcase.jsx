import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Carousel, ImageLazyLoader, ButtonIcon } from "Components";
import ShowcasePhotoInfo from './ShowcasePhotoInfo'
import nextIcon from "SVG/next.svg";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap:wrap;
  overflow: hidden;
  width: 70vw;
  height: 80vh;
  max-width: 100%;
`;

const carouselStyle = css`
  width: 100%;
  height: calc(100% - 60px);
`;

const ToolBar = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:flex-end;
  align-items:center;
  width:100%;
  height:60px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const buttonStyle = {
  width: "40px",
  height: "40px"
};

export default function HightLightsShowcase({ photoList, closeModal }) {
  const pictureCarousel = useRef(null);
  const [slickIndex, setNextIndex] = useState(0);

  const next = () => {
    pictureCarousel.current.slickNext();
  };

  const previous = () => {
    pictureCarousel.current.slickPrev();
  };
  return (
    <Container>
      <Carousel
        reference={pictureCarousel}
        containerCSS={carouselStyle}
        afterChange={setNextIndex}>
        {photoList.map(photo => (
          <ImageLazyLoader
            key={photo.id}
            objectFit="scale-down"
            src={photo.urls.regular}
            placeholderColor={photo.color}
          />
        ))}
      </Carousel>
      <ToolBar>
        <ShowcasePhotoInfo photo={photoList[slickIndex]}/>
        <ButtonContainer>
          <ButtonIcon
            {...buttonStyle}
            src={nextIcon}
            onClick={previous}
            rotate={180}
          />
          <ButtonIcon {...buttonStyle} src={nextIcon} onClick={next} />
          <ButtonIcon {...buttonStyle} rotate={45} onClick={() => closeModal()} />
        </ButtonContainer>
      </ToolBar>
    </Container>
  );
}
