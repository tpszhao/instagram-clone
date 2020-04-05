import React from 'react';
import { css } from 'styled-components';

import {ImageLazyLoader} from 'Components';
import {Container, Overlay} from './Masonry.styles'


const imageContainerCSS=css`
    overflow:hidden;
    width:100%;
    height:100%;
    background-color:green;
`;

interface Props { 
    src:string;
    color:string;
    overlayElement:any;
    height:string;
    onClick:any;
}

export default function MasonryItem({
    src,
    color='grey',
    overlayElement=null,
    height,
    onClick=()=>{}
}:Props ) {
    return (
        <Container height={height} onClick={onClick}>
            <ImageLazyLoader 
                placeholderColor={color}
                src={src}
                objectFit='cover'
                imageContainerCSS={imageContainerCSS}/>
            {overlayElement&&
                <Overlay>
                    {overlayElement}
                </Overlay>}
        </Container>
    )
}
