import React, { useEffect, useReducer, useState} from "react";
import styled from "styled-components";
import { 
    InfiniteLoader, 
    MasonryContainer, 
    MasonryItem,
    GridLoader
} from "Components";
import InfiniteLoaderReducer, {initialState} from "Reducers/InfiniteLoaderReducer";
import { allowFetching } from "Actions/InfiniteLoaderActions";
import generateRandomNumber from 'Utilities/generateRandomNumber'
import { photoProps } from 'Utilities/getProps'


const PageContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 936px;
    @media only screen and (max-width: 936px) {
        width: 100%;
    }
`;

const randomHeight = ()=>{
    return `${generateRandomNumber(200,400)}px`
}

const generateRandomList = ()=>{
    let list = [];
    for (let i=0;i<15;i++){
        list[i] = randomHeight();
    }
    return list;
}

export default function ExplorePage() {
    const [state, dispatch] = useReducer(InfiniteLoaderReducer, initialState);
    const [randomHeightList, setRandomHeightList] = useState(generateRandomList());
    const {dataList:photoList} = state;

    useEffect(() => {
        dispatch(allowFetching);
    }, []);

    useEffect(()=>{
        const heightListExtension = generateRandomList();
        setRandomHeightList([...randomHeightList,...heightListExtension]);
    },[photoList])



    return (
        <PageContainer>
            <InfiniteLoader
                query="photos"
                searchType="listPhotos"
                orderedBy="popular"
                state={state}
                dispatch={dispatch}
                loader={<GridLoader key={0} />}>
                <MasonryContainer>
                    {photoList.map((photo,i)=>{
                        const props = photoProps(photo);
                        const height = randomHeightList[i]
                        return <MasonryItem {...props} height={height}/>
                    })}
                </MasonryContainer>
            </InfiniteLoader>
        </PageContainer>
    );
}
