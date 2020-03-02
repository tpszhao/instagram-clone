import styled from "styled-components";

export const Container = styled.div`
  ${props => props.containerCSS};
`;

export const Item = styled.div`
  ${props => `
    height:${props.height}px;
    width:${props.width+1}px
  `}
  display:flex !important;
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${props => props.scaleDown || "cover"};
`;
