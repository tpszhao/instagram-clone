import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { toJson } from "unsplash-js";
import {
  GridHeader,
  GridContainer,
  GridItem,
  GridLoader,
  InfiniteLoader,
  CustomModal,
  Showcase,
} from "Components";
import { PhotoDataContext } from "context";
import unsplash from "api/unsplash";
import { ALLOW_FETCHING } from "actions/infiniteLoaderActions";
import getProps from "utilities/getProps";
import { collectionIcon } from "assets/svg";

const PageContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 936px;
  @media only screen and (max-width: 936px) {
    width: 100%;
  }
`;

interface CollectionType{
  cover_photo:{
    urls:{
      [key:string]:string;
    }
  }
  title:string;
  id:string;
  total_photos:number;
  errors?:any;
}

const CollectionHeader = ({ collection }:{collection:CollectionType}) => {
  const { cover_photo, title, total_photos = 0 } = collection;

  const src = cover_photo ? cover_photo.urls.thumb : collectionIcon;

  const totalPhotos = `${total_photos} photos`;

  const statList = [totalPhotos];

  return <GridHeader src={src} title={title} statList={statList} />;
};

interface Params{
  collectionID:string;
}

export default function CollectionPage({ 
  match:{
    path,
    params
  } 
}:RouteComponentProps<Params>) {
  const [collection, setCollection] = useState<CollectionType|null>(null);
  const [state, dispatch] = useContext(PhotoDataContext);
  const { dataList } = state.gridPage;

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [initialSlide, setInitialSlide] = useState<number>(0);

  useEffect(() => {
    dispatch(ALLOW_FETCHING(path));
    searchCollections(params.collectionID);
  }, [params.collectionID]);

  const searchCollections = (collectionID:string) => {
    unsplash.collections
      .getCollection(params.collectionID)
      .then(toJson)
      .then((json:any) => {
        setCollection(json);
      })
      .catch(() => {
        setCollection(null);
      });
  };

  const openShowcase = (index:number) => {
    setInitialSlide(index);
    setModalIsOpen(true);
  };

  if (!collection || collection.errors) return null;
  return (
    <>
      <PageContainer>
        <CollectionHeader collection={collection} />
        <InfiniteLoader
          route={path}
          query="collections"
          searchType="getCollectionPhotos"
          searchValue={collection.id}
          loader={<GridLoader key="loading" />}
        >
          <GridContainer>
            {dataList.map((item:any, i:number) => {
              const props = getProps.photos(item);
              return <GridItem {...props} onClick={() => openShowcase(i)} />;
            })}
          </GridContainer>
        </InfiniteLoader>
      </PageContainer>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <Showcase
          photoList={dataList}
          initialSlide={initialSlide}
          closeModal={() => setModalIsOpen(false)}
        />
      </CustomModal>
    </>
  );
}
