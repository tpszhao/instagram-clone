import React from "react";
import { GridCell, GridCellOverlay } from "./Grid.styles";
import { ImageLazyLoader } from "Components";

interface Props { 
  src: string;
  color: string;
  overlayElement: any;
  onClick: any;
}

export default function GridItem({
  src,
  color = "grey",
  overlayElement = null,
  onClick = () => {}
}:Props) {
  return (
    <GridCell data-cy="grid_photo" onClick={onClick}>
      <ImageLazyLoader placeholderColor={color} src={src} />
      {overlayElement && <GridCellOverlay>{overlayElement}</GridCellOverlay>}
    </GridCell>
  );
}
