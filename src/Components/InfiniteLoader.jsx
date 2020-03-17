import React from 'react';
import InfiniteScroll from "react-infinite-scroller";
import { toJson } from "unsplash-js";
import unsplash from "API/unsplash";

import {
    START_LOADING,
    NEXT_PAGE,
    UPDATE_TOTAL,
    NO_MORE_RESULTS,
    REQUEST_ERROR
} from 'Actions/infiniteLoaderActions';


export default function InfiniteLoader({
    query, 
    searchType,
    searchValue='', 
    state:{page,hasMore,isLoading,allowFetching},
    dispatch,
    orderedBy="latest",
    loader = <div key={0}>loading</div>,
    children
}) {
    const params = (searchType === 'listPhotos')?
        [page,15,orderedBy]:
        [searchValue,page,15]

    const loadMore = async () => {
        if(isLoading || !allowFetching || !hasMore) return
        try {
            dispatch(START_LOADING);
            const response = await unsplash[query][searchType](...params);
            const json = await toJson(response);
            let results;
            switch (query) {
                case "search":
                    dispatch(UPDATE_TOTAL(json.total));
                    results = json.results;
                    break;
                default:
                    results = json;
            }
            dispatch(NEXT_PAGE(results));
            if (!results.length) {
            dispatch(NO_MORE_RESULTS);
            console.log("no more results");
            }
        } catch {
            dispatch(REQUEST_ERROR);
            console.log("something went wrong");
        } 
    };
    return (
        <InfiniteScroll
            pageStart={1}
            loadMore={loadMore}
            hasMore={hasMore&&allowFetching}
            loader={loader}
            useWindow={true}>
                {children}
        </InfiniteScroll>
    )
}
