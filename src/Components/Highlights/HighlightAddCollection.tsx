import React, { useState } from "react";
import { toJson } from "unsplash-js";
import unsplash from "api/unsplash";
import capitalize from "utilities/capitalize";
import { ButtonIcon } from "Components";
import { searchIcon } from "assets/svg";
import {
  ModalContainer,
  Form,
  SearchInput,
  Photo,
  AddToCollection,
} from "./Highlights.styles";

interface Props {
  cardList: any[];
  setCardList: any;
  closeModal: any;
}

export default function HighlightAddCollection({
  cardList,
  setCardList,
  closeModal,
}: Props) {
  const [message, setMessage] = useState<string | null>(
    "Search for photos below..."
  );
  const [card, setCard] = useState<any>(null);
  const [searchValue, setSearchValue] = useState<any>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const onChange = (e: any) => {
    setSearchValue(e.target.value);
    setIsSearching(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("fetch photos");
    const newKeyword = capitalize(searchValue.trim());
    setSearchValue(newKeyword);
    const repeated =
      cardList.find((card: any) => card.keyword === newKeyword) || false;
    if (repeated) {
      const message = `${newKeyword} already exists, please try something else`;
      setMessage(message);
      return;
    }
    unsplash.photos
      .getRandomPhoto({ query: newKeyword, count: 10 })
      .then(toJson)
      .then((Json: any) => {
        if (Json.errors) {
          const message = `We couldn't find any pictures for "${newKeyword}", please try something else`;
          setMessage(message);
          return;
        }
        setMessage(null);
        setCard({ keyword: newKeyword, photoList: Json });
      });
  };

  const addToCollection = () => {
    setCardList([...cardList, card]);
    closeModal();
  };

  return (
    <ModalContainer data-cy="highlight_modal">
      {message && <div>{message}</div>}
      {!message && card && (
        <Photo src={card.photoList[0].urls.regular} alt="" />
      )}
      <Form onSubmit={handleSubmit}>
        <ButtonIcon
          width="28px"
          height="28px"
          onClick={handleSubmit}
          src={searchIcon}
        />
        <SearchInput
          onChange={onChange}
          value={searchValue}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
          type="text"
          placeholder="Search here!"
        />
        <ButtonIcon
          opacity={isSearching ? 1 : 0}
          width="14px"
          height="14px"
          rotate={45}
          onClick={() => setSearchValue("")}
        />
      </Form>
      {card && (
        <AddToCollection onClick={addToCollection}>
          Add to Collection
        </AddToCollection>
      )}
    </ModalContainer>
  );
}
