import React,{useState,useEffect} from 'react'
import Cell from './Cell/Cell'
import InfiniteScroll from 'react-infinite-scroller';
import {toJson} from 'unsplash-js'
import unsplash from 'API/unsplash'
import {GridStyle} from './GridStyle.module.css'

export default function SearchPhotoGrid({searchvalue,setTotal}) {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setPhotos([]);
        setPage(1);
        setHasMore(true);
    },[searchvalue])
    const loadMore = async()=>{
        try{
            setIsLoading(true);
            const response = await unsplash.search.photos(searchvalue, page, 15);
            const json = await toJson(response);
            (page === 1)&&setTotal(json.total);
            setPhotos([...photos, ...json.results]);
            setPage(page + 1);
            if(json.results.length < 15){
                setHasMore(false);
                console.log("no more photos")
            }
        }catch{
            console.log("something went wrong")
        }finally{
            setIsLoading(false);
        }
}

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore&&!isLoading}
            loader={<div key={0}>Loading ...</div>}
            useWindow={true}>
            <div className={GridStyle}>
                {photos.map((photo,i)=> <Cell key={i} photo={photo}/>)}
            </div>
        </InfiniteScroll>
    )
}

