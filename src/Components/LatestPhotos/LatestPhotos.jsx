import React, { useEffect } from "react";
import { 
  Card, 
  CardLoader, 
  InfiniteLoader,
  Showcase,
} from "Components";
import { PhotoDataContext } from 'context'
import {InfiniteContainer} from './InfiniteLoader.styles'
import { ALLOW_FETCHING } from 'actions/InfiniteLoaderActions';
import { useContext } from "react";


export default function LatestPhotos({
  setModalIsOpen,
  setModalScreen,
  route,
}) {
  const {state,dispatch} = useContext(PhotoDataContext);
  const photoList = state[route].dataList;

  useEffect(() => {
    dispatch(ALLOW_FETCHING(route));
  }, [])

  const closeModal = ()=>setModalIsOpen(false);
  const startShowcase = (startIndex=0)=>{
    const modalScreen = (
      <Showcase 
        photoList={photoList} 
        initialSlide={startIndex}
        closeModal={closeModal}/>)
    setModalScreen(modalScreen);
    setModalIsOpen(true);
  }

  return (
    <InfiniteLoader
      route={route}
      query='photos'
      searchType='listPhotos'
      loader={<CardLoader key='loading'/>}>
      <InfiniteContainer>
        {photoList.map((photo,i)=>{
          return (
            <Card 
              key={photo.id} 
              photo={photo}
              onClick={()=>startShowcase(i)}/>)
        })}
      </InfiniteContainer>
    </InfiniteLoader>
  );
}
