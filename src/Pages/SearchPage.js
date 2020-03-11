import React,{ useEffect, useReducer } from 'react'
import styled from 'styled-components';
import { 
    GridHeader,
    GridContainer,
    GridItem,
    GridLoader,
    InfiniteLoader,
    CustomModal,
    Showcase
} from 'Components'
import InfiniteLoaderReducer, { initialState } from 'Reducers/InfiniteLoaderReducer'
import { reset, allowFetching, pauseFetching } from 'Actions/InfiniteLoaderActions'
import getProps from 'Utilities/getProps'
import searchIcon from 'SVG/searchIcon.svg'


const PageContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width:936px;
    @media only screen and (max-width: 936px) {
        width: 100%;
    }
`;

const SearchTypeList = styled.div`
    width: 100%;
    display:flex;
    justify-content:flex-start;
`;

const SearchTypeLink = styled.div`
    cursor:pointer;
    padding:5px 15px;
    margin:10px;
    position:relative;
    font-size: x-large;
    ${props=>props.isSelected&&`
    border-bottom:2px solid black;
    `}    

    &:hover{
        border-bottom:2px solid black;
    }
`;

const SearchHeader = ({searchValue,searchType, total})=>{
    const title = `Search results for "${searchValue}"`;
    const statList = (total !== null)?[`${total} ${searchType} found`]:[];
    return <GridHeader src={searchIcon} title={title} statList={statList}/>
}

export default function SearchPage({history,match}) {
    const {searchValue,searchType} = match.params;
    const [photos, photosDispatch] = useReducer(InfiniteLoaderReducer, initialState);
    const [collections, collectionsDispatch] = useReducer(InfiniteLoaderReducer, initialState);

    const state = {photos,collections};
    const dispatch = {
        photos:photosDispatch,
        collections:collectionsDispatch
    };
    const dataList = state[searchType].dataList;

    useEffect(() => {
        dispatch[searchType](allowFetching);
        return () => {
            photosDispatch(pauseFetching);
            collectionsDispatch(pauseFetching);
        };
    }, [searchType])

    useEffect(() => {
        photosDispatch(allowFetching);
        return ()=>{
            photosDispatch(reset);
            collectionsDispatch(reset);
        }
    }, [searchValue])

    const changeSearchType = searchType=>{
        history.push(`/search/${searchType}/${searchValue}`)
    }

    return (
        <>
            <PageContainer>
                <SearchHeader 
                    searchValue={searchValue} 
                    searchType={searchType}
                    total={state[searchType].total}/>
                <SearchTypeList>
                    <SearchTypeLink 
                        onClick={()=>changeSearchType('photos')}
                        isSelected={searchType === 'photos'}>
                        Photos
                    </SearchTypeLink>
                    <SearchTypeLink 
                        onClick={()=>changeSearchType('collections')}
                        isSelected={searchType === 'collections'}>
                        Collections
                    </SearchTypeLink>
                </SearchTypeList>
                <InfiniteLoader
                    query="search"
                    searchType={searchType}
                    searchValue={searchValue}
                    state={state[searchType]}
                    dispatch={dispatch[searchType]}
                    loader={<GridLoader key='loading'/>}>
                    <GridContainer>
                        {dataList.map((item,i)=>{
                            const props = getProps[searchType](item);
                            return <GridItem {...props} onClick={()=>console.log(i)}/>
                        })}
                    </GridContainer>
                </InfiniteLoader>
            </PageContainer>

        </>
    )
}
