import React from "react";
import { ButtonIcon, Carousel, ImageLazyLoader } from "Components";
import { Card, cardCSS, ButtonBackground, CardHeaderLink} from 'Styles/Highlights'

export default function HighlightCard({ 
  card, 
  deleteCard, 
  counter,
  showcase
}) {
  const url = `/search/collections/${card.keyword}`;
  const {photoList} = card;
  return (
    <Card>
      <CardHeaderLink to={url}>
        {card.keyword}
      </CardHeaderLink>
      <Carousel
        onClick={()=>showcase(photoList)}
        counter={counter}
        containerCSS={cardCSS}>
        {photoList.map(photo=>(
            <ImageLazyLoader 
              key={photo.id}
              src={photo.urls.regular}
              placeholderColor={photo.color}/>))}
      </Carousel>
      <ButtonBackground>
        <ButtonIcon
          width='24px'
          height='24px'
          rotate={45}
          onClick={() => deleteCard(card)}/>
      </ButtonBackground>
    </Card>
  );
}
