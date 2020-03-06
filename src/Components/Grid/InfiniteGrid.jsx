import React from "react";
import { GridItem, GridLoader } from "Components";
import InfiniteScroll from "react-infinite-scroller";
import { toJson } from "unsplash-js";
import unsplash from "API/unsplash";
import {GridContainer} from 'Styles/Grid';
import {
  startLoading,
  nextPage,
  updateTotal,
  noMoreResults,
  requestError} from 'Actions/InfiniteGridActions'

const mapPhotos = photo =>{
  const src = photo.urls.regular;
  const color = photo.color;
  const overlayElement = <div>{photo.likes} likes</div>
  const props = {src,color,overlayElement}
  return <GridItem {...props} key={photo.id}/>
}

const mapCollections = collection=>{
  const coverPhoto = collection.cover_photo;
  const src = coverPhoto.urls.regular;
  const color = coverPhoto.color;
  const overlayElement = <div>{collection.total_photos} photos</div>;
  const props = {src,color,overlayElement};
  return <GridItem {...props} key={collection.id}/>
}

const mapData = {
  photos:mapPhotos,
  collections:mapCollections
}


export default function InfiniteGrid({ 
  query, 
  searchValue, 
  searchType,
  state:{dataList,page,hasMore,isLoading,allowFetching},
  dispatch
}) {

  const loadMore = async () => {
    if(isLoading || !allowFetching || !hasMore) return
    try {
      dispatch(startLoading);
      const response = await unsplash[query][searchType](searchValue, page, 15);
      const json = await toJson(response);
      let results;
      switch (query) {
        case "users":
          results = json;
          break;
        case "search":
          dispatch(updateTotal(json.total));
          results = json.results;
          break;
        default:
      }

      dispatch(nextPage(results));

      if (!results.length) {
        dispatch(noMoreResults);
        console.log("no more results");
      }

    } catch {
      dispatch(requestError);
      console.log("something went wrong");
    } 
  };

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={loadMore}
      hasMore={hasMore&&allowFetching}
      loader={<GridLoader key={0} />}
      useWindow={true}>
      <GridContainer>
        {dataList.map(mapData[searchType])}
      </GridContainer>
    </InfiniteScroll>
  );
}
