import React from "react";

import {
  CardContainer,
  UserInfo,
  ProfileImage,
  UserName,
  Photo,
  PhotoStat} from 'Styles/InfiniteLoader'

export default function Card({ photo }) {
  const url = `/user/${photo.user.username}`;
  return (
    <CardContainer>
      <UserInfo to={url}>
        <ProfileImage src={photo.user.profile_image.medium} alt="placeholder" />
        <UserName>{photo.user.name}</UserName>
      </UserInfo>
      <Photo
        src={photo.urls.regular}
        placeholderColor={photo.color}
        alt="placeholder"
      />
      <PhotoStat>{`${photo.likes} likes`}</PhotoStat>
    </CardContainer>
  );
}
