import React from 'react'
import {GridCell, GridCellOverlay} from './Grid.styles'
import {ImageLazyLoader} from 'Components'

export default function GridItem({src,color='grey',overlayElement=null}) {
    return (
        <GridCell>
            <ImageLazyLoader 
                placeholderColor={color}
                src={src}/>
            {overlayElement&&
                <GridCellOverlay>
                    {overlayElement}
                </GridCellOverlay>}
        </GridCell>
    )
}
