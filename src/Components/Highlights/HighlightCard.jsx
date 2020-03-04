import React from "react";
import { ButtonIcon, PhotoCarousel } from "Components";
import { Card, cardCSS, CardBackground, CardHeaderLink} from 'Styles/Highlights'

export default function HighlightCard({ card, deleteCard, isPlaying }) {
  const url = `/search/collections/${card.keyword}`;
  return (
    <Card>
      <CardHeaderLink to={url}>
        {card.keyword}
      </CardHeaderLink>
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
