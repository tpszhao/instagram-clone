import React,{ useEffect, useReducer } from 'react'
import { InfiniteGrid,SearchHeader } from 'Components'
import { GridPageContainer } from 'Styles/Page'
import GridReducer, { initialState } from 'Reducers/GridReducer'
import { start } from 'Actions/InfiniteGridActions'

export default function SearchPage({match}) {
    const searchValue = match.params.searchValue;
    const [state, dispatch] = useReducer(GridReducer, initialState);

    useEffect(() => {
        dispatch(start);
    }, [searchValue])

    return (
        <GridPageContainer>
            <SearchHeader type='photos' searchValue={searchValue} total={state.total}/>
            <InfiniteGrid
                state={state}
                dispatch={dispatch}
                query='search'
                type='photos'
                searchValue={searchValue}/>
        </GridPageContainer>
    )
}
