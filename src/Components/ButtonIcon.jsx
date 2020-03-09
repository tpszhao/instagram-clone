import React from "react";
import styled from "styled-components";
import cross from 'SVG/cross.svg'

const Button = styled.div`
  cursor: pointer;
  ${props=>`
    width:${props.width||'40px'};
    height:${props.height||'40px'};
    opacity:${props.opacity};
  `}
  transform: ${props => `rotate(${props.rotate}deg)`};
  background-image:url("${props=>props.src}");
  background-size:cover;
  background-position:center center;
`;

export default function ButtonIcon({style={},rotate=0, src=cross,onClick,opacity = 1,...rest}) {
  return <Button 
            {...rest}
            opacity={opacity}
            src={src}
            style={style} 
            rotate={rotate} 
            onClick={onClick} />
}