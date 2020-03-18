import React, { useContext } from 'react';
import InfiniteScroll from "react-infinite-scroller";
import { toJson } from "unsplash-js";
import unsplash from "TestAPI/unsplash";
import { PhotoDataContext } from 'TestContext'

import {
    START_LOADING,
    NEXT_PAGE,
    REQUEST_ERROR
} from 'TestActions/InfiniteLoaderActions';

const determineParams = (route,state,searchType)=>{
    switch(route){
        case "/search/:searchType/:searchValue":
            return state.searchPage[searchType];
        case "/":
        case "/explore":
            return state[route];
        default:
            return state.gridPage;
    }
}



export default function InfiniteLoader({
    route,
    query, 
    searchType,
    searchValue='', 
    orderedBy="latest",
    loader = <div key={0}>loading</div>,
    children
}) {
    const {state,dispatch} = useContext(PhotoDataContext);
    const { allowFetching, isLoading} = state;
    
    const { page, hasMore } = determineParams(route,state,searchType);

    const params = (searchType === 'listPhotos')?
        [page,15,orderedBy]:
        [searchValue,page,15]

    const loadMore = async () => {
        if(isLoading || !allowFetching || !hasMore) return
        try {
            dispatch(START_LOADING);
            const response = await unsplash[query][searchType](...params);
            const json = await toJson(response);
            const total = json.total||null;
            let results;
            switch (query) {
                case "search":
                    results = json.results;
                    break;
                default:
                    results = json;
            }
            dispatch(NEXT_PAGE({
                route,
                dataList:results,
                total,
                keyword:searchValue,
                searchType
            }));
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
