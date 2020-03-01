import React from 'react'
import {GridCell, GridCellOverlay, GridCellPhoto} from './Grid.styles'

export default function GridItem({photo}) {
    return (
        <GridCell>
            <GridCellPhoto 
                src={photo.urls.regular} 
                placeholderColor={photo.color}
                alt="placeholder"/>
            <GridCellOverlay>
                <div>{`${photo.likes} likes`}</div>
            </GridCellOverlay>
        </GridCell>
    )
}
