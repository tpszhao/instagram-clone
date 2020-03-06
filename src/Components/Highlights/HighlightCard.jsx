import React from "react";
import {css} from 'styled-components';
import { ButtonIcon, Carousel, ImageLazyLoader } from "Components";
import { Card, cardCSS, CardBackground, CardHeaderLink} from 'Styles/Highlights'

const imageContainerCSS=css`
  width: 100%;
  height: 100%;
`;

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
              placeholderColor={photo.color}
              imageContainerCSS={imageContainerCSS}/>)})}
        </Carousel>
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
