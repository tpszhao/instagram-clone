import React from "react";
import { Showcase } from "Components";
import { HighlightAddCollection } from "./";

interface Props {
  showcasePhotos: any[];
  initialSlide: number;
  cardList: any[];
  setCardList: any;
  closeModal: any;
}

export default function HighlightModal({
  showcasePhotos = [],
  initialSlide = 0,
  cardList,
  setCardList,
  closeModal,
}: Props) {
  if (showcasePhotos.length === 0) {
    return (
      <HighlightAddCollection
        cardList={cardList}
        setCardList={setCardList}
        closeModal={closeModal}
      />
    );
  }
  return (
    <Showcase
      closeModal={closeModal}
      photoList={showcasePhotos}
      initialSlide={initialSlide}
    />
  );
}
