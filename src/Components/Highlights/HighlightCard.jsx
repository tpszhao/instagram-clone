import React,{useRef} from "react";
import { ButtonIcon, Carousel, ImageLazyLoader } from "Components";
import { Card, cardCSS, ToolBar, CardHeaderLink} from './Highlights.styles'

export default function HighlightCard({ 
  card, 
  deleteCard, 
  counter,
  showcase
}) {
  const currentSlide = useRef(0);
  const url = `/search/collections/${card.keyword}`;
  const {photoList} = card;
  return (
    <Card>
      <ToolBar>
        <CardHeaderLink to={url}>
          {card.keyword}
        </CardHeaderLink>
        <ButtonIcon
          width='16px'
          height='16px'
          rotate={45}
          onClick={() => deleteCard(card)}/>
      </ToolBar>
      <Carousel
        counter={counter}
        containerCSS={cardCSS}
        onClick={()=>showcase(photoList,currentSlide.current)}
        beforeChange={(oldIndex,newIndex)=>currentSlide.current = oldIndex}
        >
        {photoList.map(photo=>(
            <ImageLazyLoader 
              key={photo.id}
              src={photo.urls.regular}
              placeholderColor={photo.color}/>))}
      </Carousel>
    </Card>
  );
}
