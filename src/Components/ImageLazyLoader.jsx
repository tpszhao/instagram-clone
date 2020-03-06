import React,{useState} from 'react'
import styled,{css} from 'styled-components';

const Container = styled.div`
    position:relative;
    ${props=>props.imageContainerCSS};
`;

const Overlay = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    background-color:${props=>`${props.placeholderColor||'grey'}`};
    opacity:${props=>props.isLoading? 1 : 0};
    transition:0.5s;
`;

const Image = styled.img`
    width:100%;
    height:100%;
    object-fit:${props=>`${props.objectFit||'cover'}`};
`;

const defaultImageContainerCSS=css`
    width: 100%;
    height: 100%;
`;

export default function ImageLazyLoader({
    src, 
    objectFit='cover',
    placeholderColor,
    imageContainerCSS=defaultImageContainerCSS,
    onClick=()=>{}
}) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <Container 
            imageContainerCSS={imageContainerCSS}
            onClick={onClick}>
            <Overlay 
                isLoading={isLoading}
                placeholderColor={placeholderColor}/>
            <Image 
                src={src}
                objectFit={objectFit}
                onLoad={()=>setIsLoading(false)}
                alt="placeholder"/>
        </Container>
    )
}



