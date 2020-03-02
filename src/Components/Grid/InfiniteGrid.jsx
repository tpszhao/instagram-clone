import React, { useState, useEffect } from "react";
import { GridItem, GridLoader } from "Components";
import InfiniteScroll from "react-infinite-scroller";
import { toJson } from "unsplash-js";
import unsplash from "API/unsplash";
import {GridContainer} from '../../Styles/Grid';

export default function InfiniteGrid({ query, searchValue, setTotal = () => {} }) {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(false);
  }, [query, searchValue]);

  const loadMore = async () => {
    try {
      setIsLoading(true);
      const response = await unsplash[query].photos(searchValue, page, 15);
      const json = await toJson(response);
      let newPhotos;
      switch (query) {
        case "users":
          newPhotos = json;
          break;
        case "search":
          setTotal(json.total);
          newPhotos = json.results;
          break;
        default:
      }
      setPhotos([...photos, ...newPhotos]);
      setPage(page + 1);
      if (newPhotos.length < 15) {
        setHasMore(false);
        console.log("no more photos");
      }
    } catch {
      setHasMore(false);
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore && !isLoading}
      loader={<GridLoader key={0} />}
      useWindow={true}
    >
      <GridContainer>
        {photos.map((photo, i) => (
          <GridItem key={i} photo={photo} />
        ))}
      </GridContainer>
    </InfiniteScroll>
  );
}
