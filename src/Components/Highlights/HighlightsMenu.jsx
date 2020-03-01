import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toJson } from "unsplash-js";
import unsplash from "API/unsplash";
import { localGet, localSet } from "API/local";
import { HighlightModal, HighlightCard, ButtonIcon } from "Components";
import {
  HighlightMenuCard, 
  HighlightHeader, 
  HighlightPhotoContainer} from './Highlights.styles'

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let keywordList = localGet("Highlights", []);
    Promise.all(keywordList.map(fetchPhotos)).then(photoLists =>
      updateCardList(photoLists, keywordList)
    );
  }, []);

  useEffect(() => {
    let keywordList = cardList.map(card => card.keyword);
    localSet("Highlights", keywordList);

    if (cardList.length > 1) {
      setStickyPos((cardList.length - 1) * 316);
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 500);
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
    let newCardList = photoLists.map((photoList, i) => {
      return { keyword: keywordList[i], photoList };
    });
    setCardList(newCardList);
  };

  const deleteCard = card => {
    let newCardList = cardList.filter(item => item !== card);
    setCardList(newCardList);
  };

  return (
    <>
      <HighlightMenuCard length={cardList.length}>
        <HighlightHeader>
          <span>Highlights</span>
          {cardList.length < 3 && (
            <ButtonIcon
              style={{ top: "2px", right: "12px" }}
              onClick={() => setModalIsOpen(true)}
            />
          )}
        </HighlightHeader>
        <HighlightPhotoContainer>
          {cardList.map(card => {
            return (
              <HighlightCard
                key={card.keyword}
                card={card}
                deleteCard={deleteCard}
                isPlaying={isPlaying}
              />
            );
          })}
        </HighlightPhotoContainer>
      </HighlightMenuCard>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        style={modalStyle}
      >
        <HighlightModal
          cardList={cardList}
          setCardList={setCardList}
          closeModal={() => {
            setModalIsOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
