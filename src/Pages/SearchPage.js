import React,{useState,useEffect} from 'react'
import {PhotoGrid,GridHeader} from 'Components'
import styled from 'styled-components'

const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 936px;
    align-items: center;
`;

export default function SearchPage(props) {
    const searchValue = props.match.params.searchValue;
    const [total, setTotal] = useState(null);
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        setPhotos([]);
        setTotal(null);
    }, [props.match.params.searchValue]);

    return (
        <Container>
            <GridHeader type='photos' searchValue={searchValue} total={total}/>
            <PhotoGrid
                photos={photos}
                setPhotos={setPhotos}
                query='search'
                setTotal={setTotal}
                searchValue={searchValue}/>
        </Container>
    )
}
