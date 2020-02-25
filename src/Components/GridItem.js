import React from 'react'
import Image from "react-graceful-image"
import styled from 'styled-components'

const Cell = styled.div`
    width: calc((100vw - 16px)/3);
    max-width: calc((936px - 16px)/3);
    height: calc((100vw - 16px)/3);
    max-height: calc((936px - 16px)/3);
    overflow: hidden;
    position: relative;
`;

const PhotoStat = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    font-size: large;
    position: absolute;
    top: 0px;
    background-color: grey;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    transition: 0.5s;
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
`;

const Photo = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;



export default function GridItem({photo}) {
    return (
        <Cell>
            <Photo 
                src={photo.urls.regular} 
                placeholderColor={photo.color}
                alt="placeholder"/>
            <PhotoStat>
                <div>{`${photo.likes} likes`}</div>
            </PhotoStat>
        </Cell>
    )
}
