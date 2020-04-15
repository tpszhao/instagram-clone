import React from "react";
import { css } from "styled-components";
import { ImageLazyLoader } from "Components";
import {
  CardContainer,
  UserInfo,
  ProfileImage,
  UserName,
  PhotoStat
} from "./InfiniteLoader.styles";

const imageContainerCSS = css`
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  min-height: 30vmin;
  max-height: 700px;
`;

interface Props { 
  photo: any;
  onClick: any;
}

export default function Card({
  photo,
  onClick = () => { }
}:Props ) {
  const url = `/user/${photo.user.username}`;
  return (
    <CardContainer>
      <UserInfo data-cy="home_page_card_user_header" to={url}>
        <ProfileImage src={photo.user.profile_image.medium} alt="" />
        <UserName>{photo.user.name}</UserName>
      </UserInfo>
      <ImageLazyLoader
        data-cy="home_page_card_photo"
        onClick={onClick}
        src={photo.urls.regular}
        placeholderColor={photo.color}
        imageContainerCSS={imageContainerCSS}
      />
      <PhotoStat>{`${photo.likes} likes`}</PhotoStat>
    </CardContainer>
  );
}
