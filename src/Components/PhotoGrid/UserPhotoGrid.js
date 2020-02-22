import React,{useState} from 'react'
import Cell from './Cell/Cell'
import InfiniteScroll from 'react-infinite-scroller';
import {toJson} from 'unsplash-js'
import unsplash from 'API/unsplash'
import {GridStyle} from './GridStyle.module.css'

export default function UserPhotoGrid({username}) {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async()=>{
      try{
        setIsLoading(true);
        const response = await unsplash.users.photos(username, page, 15,"latest");
        const json = await toJson(response);
        setPhotos([...photos, ...json]);
        setPage(page + 1);
        setHasMore(true);
        if(json.length < 15){
          setHasMore(false);
          console.log("no more photos")
      }
      }catch{
        console.log("something went wrong")
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
