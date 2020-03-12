import React from 'react';
import InfiniteScroll from "react-infinite-scroller";
import { toJson } from "unsplash-js";
import unsplash from "API/unsplash";

import {
    startLoading,
    nextPage,
    updateTotal,
    noMoreResults,
    requestError
} from 'Actions/InfiniteLoaderActions';


export default function InfiniteLoader({
    query, 
    searchType,
    searchValue='', 
    state:{page,hasMore,isLoading,allowFetching},
    dispatch,
    ordered_by="latest",
    loader = <div key={0}>loading</div>,
    children
}) {
    const params = (searchType === 'listPhotos')?
        [page,15,ordered_by]:
        [searchValue,page,15]

    const loadMore = async () => {
        if(isLoading || !allowFetching || !hasMore) return
        try {
            dispatch(startLoading);
            const response = await unsplash[query][searchType](...params);
            const json = await toJson(response);
            let results;
            switch (query) {
                case "search":
                    dispatch(updateTotal(json.total));
                    results = json.results;
                    break;
                default:
                    results = json;
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
            loader={loader}
            useWindow={true}>
                {children}
        </InfiniteScroll>
    )
}
