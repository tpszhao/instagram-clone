import React from "react";
import styled from "styled-components";
import { cross } from "assets/svg";

const Button = styled.div<any>`
  cursor: pointer;
  ${(props) => `
    width:${props.width || "40px"};
    height:${props.height || "40px"};
    opacity:${props.opacity};
    margin: ${props.margin || "0px"};
  `}
  transform: ${(props) => `rotate(${props.rotate}deg)`};
  background-image:url("${(props) => props.src}");
  background-size:cover;
  background-position:center center;
`;

interface Props {
  style: any;
  rotate: number;
  src: string;
  onClick: any;
  opacity: number;
}

export default function ButtonIcon({
  style = {},
  rotate = 0,
  src = cross,
  onClick,
  opacity = 1,
  ...rest
}: Props & any) {
  return (
    <Button
      {...rest}
      opacity={opacity}
      src={src}
      style={style}
      rotate={rotate}
      onClick={onClick}
    />
  );
}
