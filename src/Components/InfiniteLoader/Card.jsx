import React from "react";
import {css} from 'styled-components';
import {ImageLazyLoader} from 'Components'
import {
  CardContainer,
  UserInfo,
  ProfileImage,
  UserName,
  PhotoStat} from './InfiniteLoader.styles'

const imageContainerCSS=css`
  overflow:hidden;
  width: 100%;
  min-height:300px;
  max-height: 700px;
`;

export default function Card({ photo }) {
  const url = `/user/${photo.user.username}`;
  return (
    <CardContainer>
      <UserInfo to={url}>
        <ProfileImage src={photo.user.profile_image.medium} alt="placeholder" />
        <UserName>{photo.user.name}</UserName>
      </UserInfo>
      <ImageLazyLoader 
        src={photo.urls.regular}
        placeholderColor={photo.color}
        imageContainerCSS={imageContainerCSS}/>
      <PhotoStat>{`${photo.likes} likes`}</PhotoStat>
    </CardContainer>
  );
}
