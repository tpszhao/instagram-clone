import React, { useState, useEffect } from "react";
import { toJson } from "unsplash-js";
import unsplash from "api/unsplash";
import { localGet, localSet } from "api/local";
import { ButtonIcon, Showcase } from "Components";
import { HighlightCard, HighlightAddCollection } from "./";
import {
  HighlightMenuCard,
  HighlightHeader,
  HighlightCardsContainer,
} from "./Highlights.styles";

interface Props {
  setStickyPos: any;
  modalIsOpen: boolean;
  setModalIsOpen: any;
  setModalScreen: any;
}

export default function HighlightsMenu({
  setStickyPos,
  modalIsOpen,
  setModalIsOpen,
  setModalScreen,
}: Props) {
  const [cardList, setCardList] = useState<any[]>([]);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const keywordList = localGet("Highlights", []);
    Promise.all(keywordList.map(fetchPhotos)).then((photoLists: any[]) =>
      updateCardList(photoLists, keywordList)
    );
  }, []);

  useEffect(() => {
    let autoPlay: any;
    if (!modalIsOpen) {
      autoPlay = setInterval(() => {
        setCounter((idx) => idx + 1);
      }, 3000);
    }
    return () => {
      clearInterval(autoPlay);
    };
  }, [modalIsOpen]);

  useEffect(() => {
    const keywordList = cardList.map((card: any) => card.keyword);
    localSet("Highlights", keywordList);
    if (cardList.length > 1) {
      setStickyPos((cardList.length - 1) * 316);
    } else {
      setStickyPos(0);
    }
  }, [cardList, setStickyPos]);

  const fetchPhotos = async (keyword: string) => {
    return unsplash.photos
      .getRandomPhoto({ query: keyword, count: 10 })
      .then(toJson);
  };

  const updateCardList = (photoLists: any[], keywordList: string[]) => {
    const newCardList = photoLists.map((photoList: any[], i: number) => {
      return { keyword: keywordList[i], photoList };
    });
    setCardList(newCardList);
  };

  const deleteCard = (card: any) => {
    const newCardList = cardList.filter((item: any) => item !== card);
    setCardList(newCardList);
  };

  const addCollection = () => {
    const modalScreen = (
      <HighlightAddCollection
        cardList={cardList}
        setCardList={setCardList}
        closeModal={() => setModalIsOpen(false)}
      />
    );
    setModalIsOpen(true);
    setModalScreen(modalScreen);
  };

  const showcase = (photoList: any[], initialSlide: number) => {
    const modalScreen = (
      <Showcase
        closeModal={() => setModalIsOpen(false)}
        photoList={photoList}
        initialSlide={initialSlide}
      />
    );
    setModalScreen(modalScreen);
    setModalIsOpen(true);
  };

  return (
    <HighlightMenuCard>
      <HighlightHeader>
        <span>Highlights</span>
        {cardList.length < 3 && (
          <ButtonIcon
            data-cy="highlight_modal_toggle"
            width="16px"
            height="16px"
            style={{ position: "absolute", right: "8px" }}
            onClick={addCollection}
          />
        )}
      </HighlightHeader>
      <HighlightCardsContainer>
        {cardList.map((card: any) => (
          <HighlightCard
            key={card.keyword}
            card={card}
            deleteCard={deleteCard}
            counter={counter}
            showcase={showcase}
          />
        ))}
      </HighlightCardsContainer>
    </HighlightMenuCard>
  );
}
