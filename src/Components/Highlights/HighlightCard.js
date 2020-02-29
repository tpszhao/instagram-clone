import React from "react";
import styled, { css } from "styled-components";
import { ButtonIcon, PhotoCarousel } from "Components";

const Container = styled.div`
  overflow: hidden;
  position: relative;
  text-align: center;
  margin: 10px auto;
  width: calc(296px * 0.9);
  height: 296px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 976px) {
    width: calc((100vw - 32px) / 3);
    height: calc((100vw - 32px) / 3);
  }
`;

const containerCSS = css`
  width: 90%;
  height: 80%;
`;

const BackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

export default function HighlightCard({ card, deleteCard, isPlaying }) {
  return (
    <Container>
      <span>{card.keyword}</span>
      <PhotoCarousel
        isPlaying={isPlaying}
        autoplay
        containerCSS={containerCSS}
        photolist={card.photolist}
      />
      <BackGround>
        <ButtonIcon
          rotate={45}
          style={{ top: "2px", right: "12px" }}
          onClick={() => deleteCard(card)}
        />
      </BackGround>
    </Container>
  );
}
