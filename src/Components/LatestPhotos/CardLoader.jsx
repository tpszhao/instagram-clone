import React from 'react'
import styled from 'styled-components';
import { CardContainer } from './InfiniteLoader.styles'

const UserInfoPlaceholder = styled.div`
    display: flex;
    align-items: center;
    align-self:flex-start;
    height: 60px;
    text-decoration: none;
`;

const ProfileImagePlaceholder = styled.div`
    margin: 8px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color:rgba(219, 219, 219,0.5);
`;

const PhotoPlaceholder = styled.div`
    width: 100%;
    height:30vmin;
    background-color:rgba(219, 219, 219,0.5);
`;

const PhotoStatPlaceholder = styled.div`
    display: flex;
    width: 100%;
    padding: 8px;
    color:rgba(219, 219, 219,0.5);
`;

export default function CardLoader() {
    return (
        <CardContainer>
            <UserInfoPlaceholder>
                <ProfileImagePlaceholder/>
            </UserInfoPlaceholder>
            <PhotoPlaceholder/>
            <PhotoStatPlaceholder>loading</PhotoStatPlaceholder>
        </CardContainer>
    )
}
