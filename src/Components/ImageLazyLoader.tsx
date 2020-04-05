import React, { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div<any>`
  position: relative;
  ${(props) => props.imageContainerCSS};
`;

const Overlay = styled.div<any>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => props.opacity};
  background-color: ${(props) => `${props.placeholderColor || "grey"}`};
  transition: 0.5s;
`;

const defaultImageCSS = css`
  width: 100%;
  height: 100%;
`;

const Image = styled.img<any>`
    ${(props) => props.imageCSS}
    object-fit:${(props) => `${props.objectFit || "cover"}`};
`;

const defaultImageContainerCSS = css`
  width: 100%;
  height: 100%;
`;

interface Props {
  src: string;
  placeholderColor: string;
  objectFit?: string;
  imageContainerCSS?: any;
  imageCSS?: any;
  onClick?: any;
}

export default function ImageLazyLoader({
  src,
  placeholderColor,
  objectFit = "cover",
  imageContainerCSS = defaultImageContainerCSS,
  imageCSS = defaultImageCSS,
  onClick = () => {},
}: Props) {
  const [opacity, setOpacity] = useState(1);

  return (
    <Container imageContainerCSS={imageContainerCSS} onClick={onClick}>
      <Overlay opacity={opacity} placeholderColor={placeholderColor} />
      <Image
        src={src}
        objectFit={objectFit}
        imageCSS={imageCSS}
        onLoad={() => setOpacity(0)}
        alt="placeholder"
      />
    </Container>
  );
}
