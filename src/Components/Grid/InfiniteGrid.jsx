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
  noMorePhotos,
  requestError} from 'Actions/InfiniteGridActions'

export default function InfiniteGrid({ 
  query, 
  searchValue, 
  type,
  state:{photos,page,hasMore,isLoading,allowFetching},
  dispatch
}) {

  const loadMore = async () => {
    if(isLoading || !allowFetching || !hasMore) return
    try {
      dispatch(startLoading);
      const response = await unsplash[query][type](searchValue, page, 15);
      const json = await toJson(response);
      let newPhotos;
      switch (query) {
        case "users":
          newPhotos = json;
          break;
        case "search":
          dispatch(updateTotal(json.total));
          newPhotos = json.results;
          break;
        default:
      }

      dispatch(nextPage(newPhotos));

      if (!newPhotos.length) {
        dispatch(noMorePhotos);
        console.log("no more photos");
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
      useWindow={true}
    >
      <GridContainer>
        {photos.map(photo => {
          return <GridItem key={photo.id} photo={photo} />
        })}
      </GridContainer>
    </InfiniteScroll>
  );
}
