import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toJson } from "unsplash-js";
import unsplash from "API/unsplash";
import { localGet, localSet } from "API/local";
import { HighlightAddCollection, HighlightCard, ButtonIcon } from "Components";
import {
  HighlightMenuCard,
  HighlightHeader,
  HighlightPhotoContainer
} from "Styles/Highlights";

import HightLightsShowcase from "./HightLightsShowcase";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "none",
    padding: "none",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement("#root");

export default function HighlightsMenu({ setStickyPos }) {
  const [cardList, setCardList] = useState([]);
  const [showcasePhotos, setShowcasePhotos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const autoPlay = setInterval(() => {
      setCounter(idx => idx + 1);
    }, 3000);
    const keywordList = localGet("Highlights", []);
    Promise.all(keywordList.map(fetchPhotos)).then(photoLists =>
      updateCardList(photoLists, keywordList)
    );
    return () => clearInterval(autoPlay);
  }, []);

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

  const closeModal = () => {
    setModalIsOpen(false);
    setShowcasePhotos([]);
  };

  const showcase = photoList => {
    setShowcasePhotos(photoList);
    setModalIsOpen(true);
  };

  return (
    <>
      <HighlightMenuCard length={cardList.length}>
        <HighlightHeader>
          <span>Highlights</span>
          {cardList.length < 3 && (
            <ButtonIcon
              width='24px'
              height='24px'
              style={{ position: "absolute", top: "2px", right: "12px" }}
              onClick={() => setModalIsOpen(true)}
            />
          )}
        </HighlightHeader>
        <HighlightPhotoContainer>
          {cardList.map(card => (
            <HighlightCard
              key={card.keyword}
              card={card}
              deleteCard={deleteCard}
              counter={counter}
              showcase={showcase}
            />
          ))}
        </HighlightPhotoContainer>
      </HighlightMenuCard>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        {showcasePhotos.length === 0 && (
          <HighlightAddCollection
            cardList={cardList}
            setCardList={setCardList}
            closeModal={closeModal}
          />
        )}
        {showcasePhotos.length > 0 && (
          <HightLightsShowcase
            closeModal={closeModal}
            photoList={showcasePhotos}
          />
        )}
      </Modal>
    </>
  );
}
