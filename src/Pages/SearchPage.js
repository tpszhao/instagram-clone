import React,{useState,useEffect} from 'react'
import {PhotoGrid} from 'Components'
import styled from 'styled-components'

const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 936px;
    align-items: center;
`;
const Header = styled.div`
    width: 100%;
    height: 256px;
    display: grid;
    grid-template-rows: 60px 50px 40px auto;
`;
const SearchValue = styled.span`
    align-self: center;
    font-size: x-large;
    grid-column: 1/2;
    grid-row: 2/3;
`;
const Stat = styled.div`
    max-width: 368px;
    font-size: large;
    grid-column: 1/2;
    grid-row: 3/4;
    display: flex;
    align-content: center;
    justify-content: space-between;
`;

export default function SearchPage(props) {
    const searchValue = props.match.params.searchValue;
    const [total, setTotal] = useState(0);
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        setPhotos([]);
        setTotal(0);
    }, [props.match.params.searchValue]);

    return (
        <Container>
            <Header>
                <SearchValue>Search Result for "{searchValue}"</SearchValue>
                <Stat>
                    <span>{total} photos found</span>
                </Stat>
            </Header>
            <PhotoGrid
                photos={photos}
                setPhotos={setPhotos}
                query='search'
                setTotal={setTotal}
                searchValue={searchValue}/>
        </Container>
    )
}
