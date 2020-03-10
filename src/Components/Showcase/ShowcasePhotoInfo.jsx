import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    height: 60px;
    width:calc(100% - 120px);
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


export default function ShowcasePhotoInfo({photo,showUser=true}) {
    return (
        <Container key={photo.id}>
            {showUser&&
            <UserLink to={`/user/${photo.user.username}`}>
                <ProfileImage
                    src={photo.user.profile_image.medium}
                    alt="avatar"/>
                <UserName>{photo.user.name}</UserName>
            </UserLink>}
            <PhotoStat>{photo.likes} likes </PhotoStat>
        </Container>
    )
}
