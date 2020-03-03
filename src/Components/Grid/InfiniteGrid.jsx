import React, { useEffect } from "react";
import { GridItem, GridLoader } from "Components";
import InfiniteScroll from "react-infinite-scroller";
import { toJson } from "unsplash-js";
import unsplash from "API/unsplash";
import {GridContainer} from 'Styles/Grid';
import {
  reset,
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

  useEffect(() => {
    dispatch(reset);
  }, [searchValue])

  const loadMore = async () => {
    console.log(`page ${page} loading is ${isLoading}`);
    if(isLoading) return
    try {
      console.log(`fetching page ${page}`);
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
      console.log(`page ${page} received`);

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
      hasMore={allowFetching && hasMore && !isLoading}
      loader={<GridLoader key={0} />}
      useWindow={true}
    >
      <GridContainer>
        {photos.map((photo, i) => {
          return <GridItem key={i} photo={photo} />
        })}
      </GridContainer>
    </InfiniteScroll>
  );
}
