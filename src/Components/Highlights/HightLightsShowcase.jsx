import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Carousel, ImageLazyLoader, ButtonIcon } from "Components";
import nextIcon from "SVG/next.svg";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 70vw;
  height: 80vh;
  max-width: 100%;
`;

const pictureCarouselStyle = css`
  width: 100%;
  height: calc(100% - 60px);
`;

const infoCarouselStyle = css`
  width: 100%;
  height: 60px;
`;

const PhotoInfo = styled.div`
  position: relative;
  width: 75%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 60px;
  text-decoration: none;
`;

const ProfileImage = styled.img`
  margin: 5px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  text-decoration: none;
  color: black;
`;

const PhotoStat = styled.span`
  text-decoration: none;
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  bottom: 0;
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
        containerCSS={pictureCarouselStyle}
        afterChange={setNextIndex}
      >
        {photoList.map(photo => (
          <ImageLazyLoader
            key={photo.id}
            objectFit="scale-down"
            src={photo.urls.regular}
            placeholderColor={photo.color}
          />
        ))}
      </Carousel>
      {(() => {
        const photo = photoList[slickIndex];
        return (
          <PhotoInfo key={photo.id}>
            <UserLink to={`/user/${photo.user.username}`}>
              <ProfileImage
                src={photo.user.profile_image.medium}
                alt="avatar"
              />
              <UserName>{photo.user.name}</UserName>
            </UserLink>
            <PhotoStat>{photo.likes} likes </PhotoStat>
          </PhotoInfo>
        );
      })()}
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
    </Container>
  );
}
