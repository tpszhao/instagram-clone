import React from "react";
import styled from "styled-components";
import cross from 'SVG/cross.svg'

const Button = styled.div`
  cursor: pointer;
  width:20px;
  height:20px;
  transform: ${props => `rotate(${props.rotate}deg)`};
  background-image:url("${props=>props.src}");
  background-size:cover;
  background-position:center center;
  position: absolute;
  z-index: 10;
`;

export default function ButtonIcon({style={},rotate=0, onClick}) {
  return <Button 
            src={cross}
            style={style} 
            rotate={rotate} 
            onClick={onClick} />
}