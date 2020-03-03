import React from 'react'
import {css} from 'styled-components';
import {GridCell, GridCellOverlay} from 'Styles/Grid'
import {ImageLazyLoader} from 'Components'

const imageContainerCSS=css`
    width: 100%;
    height: 100%;
`;

export default function GridItem({photo}) {
    return (
        <GridCell>
            <ImageLazyLoader 
                placeholderColor={photo.color}
                src={photo.urls.regular}
                imageContainerCSS={imageContainerCSS} />
            <GridCellOverlay>
                <div>{`${photo.likes} likes`}</div>
            </GridCellOverlay>
        </GridCell>
    )
}
