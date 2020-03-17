import React, { useState,useEffect,useReducer } from "react";
import { 
  Card, 
  CardLoader, 
  InfiniteLoader,
  Showcase
} from "Components";
import {InfiniteContainer} from './InfiniteLoader.styles'
import infiniteLoaderReducer, { initialState } from 'reducers/infiniteLoaderReducer'
import { allowFetching } from 'actions/infiniteLoaderActions';


export default function LatestPhotos({setModalIsOpen,setModalScreen}) {
  const [state, dispatch] = useReducer(infiniteLoaderReducer, initialState);
  const {dataList:photoList} = state;

  useEffect(() => {
    dispatch(allowFetching);
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
      query='photos'
      searchType='listPhotos'
      state={state}
      dispatch={dispatch}
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
