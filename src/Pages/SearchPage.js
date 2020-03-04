import React,{ useEffect, useReducer } from 'react'
import styled from 'styled-components';
import { InfiniteGrid,GridHeader } from 'Components'
import GridReducer, { initialState } from 'Reducers/GridReducer'
import { reset, start } from 'Actions/InfiniteGridActions'
import searchIcon from 'SVG/searchIcon.svg'

const PageContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 936px;
    align-items: center;
`;


const SearchHeader = ({searchValue,total})=>{
    const title = `Search results for "${searchValue}"`;
    const statList = (total !== null)?[`${total} photos found`]:[];
    return <GridHeader src={searchIcon} title={title} statList={statList}/>
}

export default function SearchPage({match}) {
    const searchValue = match.params.searchValue;
    const [state, dispatch] = useReducer(GridReducer, initialState);

    useEffect(() => {
        dispatch(reset);
        dispatch(start);
    }, [searchValue])

    return (
        <PageContainer>
            <SearchHeader searchValue={searchValue} total={state.total}/>
            <InfiniteGrid
                state={state}
                dispatch={dispatch}
                query='search'
                type='photos'
                searchValue={searchValue}/>
        </PageContainer>
    )
}
