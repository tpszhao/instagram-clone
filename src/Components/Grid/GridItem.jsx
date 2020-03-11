import React from 'react'
import {GridCell, GridCellOverlay} from './Grid.styles'
import {ImageLazyLoader} from 'Components'

export default function GridItem({
    src,
    color='grey',
    overlayElement=null,
    onClick=()=>{}
}) {
    console.log(overlayElement);
    console.log(<div>stuff</div>);
    return (
        <GridCell onClick={onClick}>
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
