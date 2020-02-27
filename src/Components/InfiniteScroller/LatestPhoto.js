import React,{useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {toJson} from 'unsplash-js'
import styled from 'styled-components'
import {Card,CardLoader} from 'Components'
import unsplash from 'API/unsplash'

const InfiniteContainer = styled.div`
    margin:16px;
    width:616px;
    max-width:calc(100vw - 32px);
    display:flex;
    align-items:center;
    flex-direction:column;
    flex-wrap:nowrap;
`;

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

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore&&!isLoading}
            loader={<CardLoader key={0} />}
            useWindow={true}>
                <InfiniteContainer>
                    {photos.map((photo,i)=> <Card key={i} photo={photo}/>)}
                </InfiniteContainer>
        </InfiniteScroll>
    )
}
