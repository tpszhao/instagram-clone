import React,{ useEffect, useReducer } from 'react'
import { InfiniteGrid,GridHeader } from 'Components'
import { GridPageContainer } from 'Styles/Page'
import GridReducer, { initialState } from 'Reducers/GridReducer'
import { start } from 'Actions/InfiniteGridActions'

const SearchHeader = ({searchValue,total})=>{
    const title = `Search results for "${searchValue}"`;
    const statList = (total !== null)?[`${total} photos found`]:[];
    return <GridHeader title={title} statList={statList}/>
}

export default function SearchPage({match}) {
    const searchValue = match.params.searchValue;
    const [state, dispatch] = useReducer(GridReducer, initialState);

    useEffect(() => {
        dispatch(start);
    }, [searchValue])

    return (
        <GridPageContainer>
            <SearchHeader searchValue={searchValue} total={state.total}/>
            <InfiniteGrid
                state={state}
                dispatch={dispatch}
                query='search'
                type='photos'
                searchValue={searchValue}/>
        </GridPageContainer>
    )
}
