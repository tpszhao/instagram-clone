import React, { useEffect } from "react";
import { Card, CardLoader, InfiniteLoader, Showcase } from "Components";
import { PhotoDataContext } from "context";
import { InfiniteContainer } from "./InfiniteLoader.styles";
import { ALLOW_FETCHING } from "actions/infiniteLoaderActions";
import { useContext } from "react";

interface Props {
  setModalIsOpen: any;
  setModalScreen: any;
  route: string;
}

export default function LatestPhotos({
  setModalIsOpen,
  setModalScreen,
  route,
}: Props) {
  const [state, dispatch] = useContext(PhotoDataContext);
  const photoList = state[route].dataList;

  useEffect(() => {
    dispatch(ALLOW_FETCHING(route));
  }, [dispatch, route]);

  const closeModal = () => setModalIsOpen(false);
  const startShowcase = (startIndex = 0) => {
    const modalScreen = (
      <Showcase
        photoList={photoList}
        initialSlide={startIndex}
        closeModal={closeModal}
      />
    );
    setModalScreen(modalScreen);
    setModalIsOpen(true);
  };

  return (
    <InfiniteLoader
      route={route}
      query="photos"
      searchType="listPhotos"
      searchValue=""
      orderedBy="latest"
      loader={<CardLoader key="loading" />}
    >
      <InfiniteContainer>
        {photoList.map((photo: any, i: number) => {
          return (
            <Card
              key={photo.id}
              photo={photo}
              onClick={() => startShowcase(i)}
            />
          );
        })}
      </InfiniteContainer>
    </InfiniteLoader>
  );
}
