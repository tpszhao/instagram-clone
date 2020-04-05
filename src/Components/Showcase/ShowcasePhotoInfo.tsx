import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div<{ opacity: number }>`
  opacity: ${(props) => props.opacity};

  position: relative;
  height: 60px;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;

  transition: 0.2s;
`;

const UserLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 60px;
  text-decoration: none;
`;

const ProfileImage = styled.img<{ src: string; alt: string }>`
  margin: 5px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
`;

const PhotoStat = styled.span`
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
`;

interface Props {
  photo: any;
  showUserAvatar: boolean;
  opacity: number;
}

export default function ShowcasePhotoInfo({
  photo,
  showUserAvatar = true,
  opacity = 1,
}: Props) {
  return (
    <Container opacity={opacity}>
      {showUserAvatar && (
        <UserLink to={`/user/${photo.user.username}`}>
          <ProfileImage src={photo.user.profile_image.medium} alt="" />
          <UserName>{photo.user.name}</UserName>
        </UserLink>
      )}
      <PhotoStat>{photo.likes} likes </PhotoStat>
    </Container>
  );
}
