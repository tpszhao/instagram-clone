import React from "react";
import styled from "styled-components";

const ButtonPart = styled.div`
  cursor: pointer;
  transform: ${props => `rotate(${props.rotate}deg)`};
  width: ${props => (props.horizontal ? "20px" : "4px")};
  height: ${props => (props.horizontal ? "4px" : "20px")};
  top: ${props => (props.horizontal ? "8px" : "")};
  left: ${props => (props.horizontal ? "-8px" : "")};
  position: absolute;
  background-color: rgb(219, 219, 219);
  z-index: 5;
`;

export default function ButtonIcon({style={},rotate=0, onClick,opacity=1}) {
    return (
        <ButtonPart style={{...style,opacity}} rotate={rotate} onClick={onClick}>
            <ButtonPart horizontal/>
        </ButtonPart>)
}

// const Button = styled.div`
//   width: 40px;
//   height: 40px;
//   background: black;
//   position: relative;

//   &::before,
//   &::after {
//     content: "";
//     position: absolute;
//     background: red;
//   }
//   &::before {
//     width: 5px;
//     height: 40px;
//     left: 50%;
//     transform: translateX(-50%);
//   }

//   &::after {
//     width: 40px;
//     height: 5px;

//     top: 50%;
//     transform: translateY(-50%);
//   }
// `;

// export default function ButtonIcon({
//   style = {},
//   rotate = 0,
//   onClick,
//   opacity = 1
// }) {
//   return <Button style={{ ...style, opacity }} onClick={onClick}></Button>;
// }
