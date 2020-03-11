import React,{useState} from 'react'
import styled,{css} from 'styled-components';

const Container = styled.div`
    position:relative;
    ${props=>props.imageContainerCSS};
`;

const Overlay = styled.div`
    position:absolute;
    z-index:2;
    width:100%;
    height:100%;
    opacity:${props=>props.opacity};
    background-color:${props=>`${props.placeholderColor||'grey'}`};
    transition: 0.5s;
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
    const [opacity, setOpacity] = useState(1);

    return (
        <Container 
            imageContainerCSS={imageContainerCSS}
            onClick={onClick}>
            <Overlay 
                opacity={opacity}
                placeholderColor={placeholderColor}/>
            <Image 
                src={src}
                objectFit={objectFit}
                onLoad={()=>setOpacity(0)}
                alt="placeholder"/>
        </Container>
    )
}



