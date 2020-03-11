import React, { useEffect,useReducer } from "react";
import { Card, CardLoader, InfiniteLoader } from "Components";
import {InfiniteContainer} from './InfiniteLoader.styles'
import InfiniteLoaderReducer, { initialState } from 'Reducers/InfiniteLoaderReducer'
import { allowFetching } from 'Actions/InfiniteLoaderActions'


export default function LatestPhotos() {
  const [state, dispatch] = useReducer(InfiniteLoaderReducer, initialState);
  const {dataList:photoList} = state;

  useEffect(() => {
    dispatch(allowFetching);
  }, [])

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
              onClick={()=>console.log(i)}/>)
        })}
      </InfiniteContainer>
    </InfiniteLoader>
  );
}
