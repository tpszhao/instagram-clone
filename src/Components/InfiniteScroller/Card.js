import React from "react";
import { Link } from "react-router-dom";
import Image from "react-graceful-image";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 100%;
  margin: 10px;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled(Link)`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  text-decoration: none;
`;

const ProfileImage = styled(Image)`
  margin: 5px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const UserName = styled.span`
  text-decoration: none;
  color: black;
`;

const Photo = styled(Image)`
  width: 100%;
  max-height: 700px;
  object-fit: cover;
`;

const PhotoStat = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  padding-left: 30px;
`;

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
