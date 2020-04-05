import React,{useRef} from "react";
import { ButtonIcon, Carousel, ImageLazyLoader } from "Components";
import { Card, cardCSS, ToolBar, CardHeaderLink } from './Highlights.styles'

interface Props { 
  card: any;
  deleteCard: any;
  counter: number;
  showcase: any;
}

export default function HighlightCard({ 
  card, 
  deleteCard, 
  counter,
  showcase
}:Props ) {
  const currentSlide = useRef<number>(0);
  const url = `/search/collections/${card.keyword}`;
  const { photoList } = card;
  const beforeChange = (
    oldIndex: number,
    newIndex: number
  ) => { 
    currentSlide.current = newIndex;
  }
  return (
    <Card>
      <ToolBar>
        <CardHeaderLink to={url}>{card.keyword}</CardHeaderLink>
        <ButtonIcon
          width="16px"
          height="16px"
          rotate={45}
          onClick={() => deleteCard(card)}
        />
      </ToolBar>
      <Carousel
        counter={counter}
        containerCSS={cardCSS}
        onClick={() => showcase(photoList, currentSlide.current)}
        beforeChange={beforeChange}
      >
        {photoList.map((photo: any) => (
          <ImageLazyLoader
            key={photo.id}
            src={photo.urls.regular}
            placeholderColor={photo.color}
          />
        ))}
      </Carousel>
    </Card>
  );
}
