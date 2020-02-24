import React,{useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import {toJson} from 'unsplash-js'
import {Card} from './';
import unsplash from 'API/unsplash'


export default function LatestPhoto() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async()=>{
        try{
            setIsLoading(true);
            const response = await unsplash.photos.listPhotos(page, 15, "latest");
            const json = await toJson(response);
            setPhotos([...photos, ...json]);
            setPage(page + 1);
            if(json.length < 15){
                setHasMore(false);
                console.log("no more photos")
            }
        }catch{
            console.log('something went wrong');
        }finally{
            setIsLoading(false);
        }
    }

    const InfiniteScrollStyle ={
        maxWidth:'616px',
        margin:'16px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        flexWrap:'nowrap'
    }


    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore&&!isLoading}
            loader={<div key={0}>Loading ...</div>}
            useWindow={true}>
                <div style={InfiniteScrollStyle}>
                    {photos.map((photo,i)=> <Card key={i} photo={photo}/>)}
                </div>
        </InfiniteScroll>
    )
}
