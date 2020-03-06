import React from "react";
import { ButtonIcon, Carousel, ImageLazyLoader } from "Components";
import { Card, cardCSS, ButtonBackground, CardHeaderLink} from 'Styles/Highlights'

export default function HighlightCard({ card, deleteCard, isPlaying }) {
  const url = `/search/collections/${card.keyword}`;
  return (
    <Card>
      <CardHeaderLink to={url}>
        {card.keyword}
      </CardHeaderLink>
      <Carousel
        autoplay
        isPlaying={isPlaying}
        containerCSS={cardCSS}>
        {card.photoList.map(photo=>{
          return (
            <ImageLazyLoader 
              key={photo.id}
              src={photo.urls.regular}
              placeholderColor={photo.color}/>)})}
        </Carousel>
      <ButtonBackground>
        <ButtonIcon
          rotate={45}
          onClick={() => deleteCard(card)}/>
      </ButtonBackground>
    </Card>
  );
}
