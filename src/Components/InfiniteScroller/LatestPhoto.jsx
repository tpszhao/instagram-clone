import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { toJson } from "unsplash-js";
import { Card, CardLoader } from "Components";
import {InfiniteContainer} from './InfiniteScroller.styles'
import unsplash from "API/unsplash";

export default function LatestPhoto() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    try {
      if (!hasMore) return;
      setIsLoading(true);
      const response = await unsplash.photos.listPhotos(page, 15, "latest");
      const json = await toJson(response);
      setPhotos([...photos, ...json]);
      setPage(page + 1);
      if (!json.length) {
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
      loader={<CardLoader key={0} />}
      useWindow={true}
    >
      <InfiniteContainer>
        {photos.map((photo, i) => (
          <Card key={photo.id} photo={photo} />
        ))}
      </InfiniteContainer>
    </InfiniteScroll>
  );
}
