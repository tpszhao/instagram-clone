import React,{useState,useEffect} from 'react'
import {toJson} from 'unsplash-js'
import {PhotoGrid} from 'Components'
import unsplash from 'API/unsplash'
import styled from 'styled-components'

const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 936px;
    align-items: center;
`;

const UserHeader = styled.div`
    width: 100%;
    height: 256px;
    display: grid;
    grid-template-columns:300px auto;
    grid-template-rows: 60px 50px 40px auto;
    @media only screen and (max-width: 720px){
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
`;

const ProfileImage = styled.img`
    width: 100%;
    max-width: 150px;
    grid-column: 1/2;
    grid-row: 1/5;
    border-radius: 50%;
    justify-self: center;
    align-self: center;
`;

const UserName = styled.span`
    align-self: center;
    font-size: x-large;
    grid-column: 2/3;
    grid-row: 2/3;
`;

const UserStat = styled.div`
    max-width: 368px;
    font-size: large;
    grid-column: 2/3;
    grid-row: 3/4;
    display: flex;
    align-content: center;
    justify-content: space-between;
    @media only screen and (max-width: 720px){
        flex-direction: column;
        text-align: center;
    }
`;

export default function UserPage(props) {
    const [user, setUser] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        setPhotos([]);
        unsplash.users
            .profile(props.match.params.username)
            .then(toJson)
            .then(json => {
                setUser(json);
            }).catch(()=>{
                setUser(null);
            });
    }, [props.match.params.username]);

    if(!user||user.errors) return null;
    return (
        <Container>
            <UserHeader>
                <ProfileImage 
                    src={user.profile_image.large} 
                    alt="avatar"/>
                <UserName>{user.name}</UserName>
                <UserStat>
                    <span>{user.total_likes} likes</span>
                    <span>{user.total_photos} photos</span>
                    <span>{user.followers_count} followers</span>
                </UserStat>
            </UserHeader>
            <PhotoGrid
                photos={photos}
                setPhotos={setPhotos}
                query='users'
                searchValue={user.username} />
        </Container>
    )
}
