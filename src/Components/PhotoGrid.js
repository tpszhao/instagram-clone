import React,{useState,useEffect} from 'react'
import {GridItem} from './'
import InfiniteScroll from 'react-infinite-scroller'
import {toJson} from 'unsplash-js'
import unsplash from 'API/unsplash'
import styled from 'styled-components'

const Grid = styled.div`
  margin: auto;
  margin-bottom: 20px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3,auto);
`;

export default function PhotoGrid({
  photos,
  setPhotos,
  query,
  searchValue,
  setTotal=()=>{}
}){
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
    }, [query,searchValue])

    const loadMore = async()=>{
      try{
        setIsLoading(true);
        const response = await unsplash[query].photos(searchValue, page, 15);
        const json = await toJson(response);
        let newPhotos;
        switch(query){
          case 'users':
            newPhotos = json;
            break;
          case 'search':
            (page === 1)&&setTotal(json.total);
            newPhotos = json.results;
            break;
          default:
        }
        setPhotos([...photos, ...newPhotos]);
        setPage(page + 1);
        setHasMore(true);
        if(newPhotos.length < 15){
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
            <Grid>
              {photos.map((photo,i)=> <GridItem key={i} photo={photo}/>)}
            </Grid>
        </InfiniteScroll>
    )
}
