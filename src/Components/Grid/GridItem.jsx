import React from 'react'
import {css} from 'styled-components';
import {GridCell, GridCellOverlay} from 'Styles/Grid'
import {ImageLazyLoader} from 'Components'

const imageContainerCSS=css`
    width: 100%;
    height: 100%;
`;

export default function GridItem({src,color='grey',overlayElement=null}) {
    return (
        <GridCell>
            <ImageLazyLoader 
                placeholderColor={color}
                src={src}
                imageContainerCSS={imageContainerCSS} />
            {overlayElement&&
                <GridCellOverlay>
                    {overlayElement}
                </GridCellOverlay>}
        </GridCell>
    )
}
