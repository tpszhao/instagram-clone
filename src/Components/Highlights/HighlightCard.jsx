import React from "react";
import { ButtonIcon, PhotoCarousel } from "Components";
import { Card, cardCSS, CardBackground} from 'Styles/Highlights'

export default function HighlightCard({ card, deleteCard, isPlaying }) {
  return (
    <Card>
      <span>{card.keyword}</span>
      <PhotoCarousel
        autoplay
        isPlaying={isPlaying}
        containerCSS={cardCSS}
        photoList={card.photoList}
      />
      <CardBackground>
        <ButtonIcon
          rotate={45}
          style={{ top: "2px", right: "12px" }}
          onClick={() => deleteCard(card)}
        />
      </CardBackground>
    </Card>
  );
}
