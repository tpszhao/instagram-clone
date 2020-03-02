import React,{useState,useEffect} from 'react'
import {InfiniteGrid,SearchHeader} from 'Components'
import styled from 'styled-components'

const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 936px;
    align-items: center;
`;

export default function SearchPage({match}) {
    const searchValue = match.params.searchValue;
    const [total, setTotal] = useState(null);
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        setPhotos([]);
        setTotal(null);
    }, [match.params.searchValue]);

    return (
        <Container>
            <SearchHeader type='photos' searchValue={searchValue} total={total}/>
            <InfiniteGrid
                photos={photos}
                setPhotos={setPhotos}
                query='search'
                setTotal={setTotal}
                searchValue={searchValue}/>
        </Container>
    )
}
