import React from 'react';
import searchIcon from 'SVG/searchIcon.svg'
import {Container,Image,Title,Stats} from 'Styles/SearchHeader'

export default function SearchHeader({type,user=null,total=null,searchValue=''}) {
    const imageSrc = user?user.profile_image.large:searchIcon;    
    
    return (
        <Container>
            <Image src={imageSrc} alt="avatar"/>
            {user&&<Title>{user.name}</Title>}
            {!user&&<Title>Search results for "{searchValue}"</Title>}
            <Stats>
                {user&&
                <>
                    <span>{user.total_likes} likes</span>
                    <span>{user.total_photos} photos</span>
                    <span>{user.followers_count} followers</span>
                </>}
                {!user&&total&&<span>{total} {type} found</span>}
            </Stats>
        </Container>
    )
}
