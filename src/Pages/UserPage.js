import React,{useState,useEffect} from 'react'
import {toJson} from 'unsplash-js'
import {InfiniteGrid, SearchHeader} from 'Components'
import unsplash from 'API/unsplash'
import styled from 'styled-components'

const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 936px;
    align-items: center;
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
            <SearchHeader type='user' user={user}/>
            <InfiniteGrid
                photos={photos}
                setPhotos={setPhotos}
                query='users'
                searchValue={user.username} />
        </Container>
    )
}
