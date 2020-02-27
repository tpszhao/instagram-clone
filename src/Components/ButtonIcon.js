import React from 'react'
import styled from 'styled-components';


const ButtonPart = styled.div`
    cursor: pointer;
    transform: ${props=>`rotate(${props.rotate}deg)`};
    width:${props=>props.horizontal? '20px':'4px'};
    height:${props=>props.horizontal? '4px':'20px'};
    top: ${props=>props.horizontal? '8px':''};
    left: ${props=>props.horizontal? '-8px':''};
    position:absolute;
    background-color: rgb(219,219,219);
    z-index: 5;
`;

export default function ButtonIcon({style={},rotate=0, onClick,opacity=1}) {
    return (
        <ButtonPart style={{...style,opacity}} rotate={rotate} onClick={onClick}>
            <ButtonPart horizontal/>
        </ButtonPart>)
}
