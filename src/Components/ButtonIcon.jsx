import React from "react";
import styled from "styled-components";
import cross from 'SVG/cross.svg'

const Button = styled.div`
  cursor: pointer;
  width:${props=>`${props.width || '20px'}`};
  height:${props=>`${props.height || '20px'}`};
  transform: ${props => `rotate(${props.rotate}deg)`};
  background-image:url("${props=>props.src}");
  background-size:cover;
  background-position:center center;
`;

export default function ButtonIcon({style={},rotate=0, src=cross,onClick,...rest}) {
  return <Button 
            {...rest}
            src={src}
            style={style} 
            rotate={rotate} 
            onClick={onClick} />
}