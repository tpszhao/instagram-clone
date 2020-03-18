import React, { useState, useEffect } from "react";
import { toJson } from "unsplash-js";
import unsplash from "TestAPI/unsplash";
import { localGet, localSet } from "TestAPI/local";
import { ButtonIcon, Showcase } from 'Components';
import {HighlightCard,HighlightAddCollection} from './';
import {
  HighlightMenuCard,
  HighlightHeader,
  HighlightCardsContainer
} from "./Highlights.styles";


export default function HighlightsMenu({ 
  setStickyPos,
  modalIsOpen,
  setModalIsOpen,
  setModalScreen
}) {
  const [cardList, setCardList] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const keywordList = localGet("Highlights", []);
    Promise.all(keywordList.map(fetchPhotos)).then(photoLists =>
      updateCardList(photoLists, keywordList)
    );
  }, []);

  useEffect(() => {
    let autoPlay;
    if(!modalIsOpen){
      autoPlay = setInterval(() => {
        setCounter(idx => idx + 1);
      }, 3000);
    }
    return () => {
      clearInterval(autoPlay);
    };
  }, [modalIsOpen])

  useEffect(() => {
    const keywordList = cardList.map(card => card.keyword);
    localSet("Highlights", keywordList);
    if (cardList.length > 1) {
      setStickyPos((cardList.length - 1) * 316);
    } else {
      setStickyPos(0);
    }
  }, [cardList]);

  const fetchPhotos = async keyword => {
    return unsplash.photos
      .getRandomPhoto({ query: keyword, count: 10 })
      .then(toJson);
  };

  const updateCardList = (photoLists, keywordList) => {
    const newCardList = photoLists.map((photoList, i) => {
      return { keyword: keywordList[i], photoList };
    });
    setCardList(newCardList);
  };

  const deleteCard = card => {
    const newCardList = cardList.filter(item => item !== card);
    setCardList(newCardList);
  };

  const addCollection = ()=>{
    const modalScreen = (
      <HighlightAddCollection
        cardList={cardList}
        setCardList={setCardList}
        closeModal={()=>setModalIsOpen(false)}/>)
    setModalIsOpen(true);
    setModalScreen(modalScreen)
  }

  const showcase = (photoList,initialSlide) => {
    const modalScreen = (
      <Showcase
        closeModal={()=>setModalIsOpen(false)}
        photoList={photoList}
        initialSlide={initialSlide}/>
    )
    setModalScreen(modalScreen);
    setModalIsOpen(true);
  };

  return (
    <HighlightMenuCard length={cardList.length}>
      <HighlightHeader>
        <span>Highlights</span>
        {cardList.length < 3 && (
          <ButtonIcon
            width='16px'
            height='16px'
            style={{position:'absolute', right:'8px'}}
            onClick={addCollection}
          />
        )}
      </HighlightHeader>
      <HighlightCardsContainer>
        {cardList.map(card => (
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
