import React, { useEffect, useReducer, useState} from "react";
import styled from "styled-components";
import { 
    InfiniteLoader, 
    MasonryContainer, 
    MasonryItem,
    GridLoader,
    CustomModal,
    Showcase
} from "Components";
import InfiniteLoaderReducer, {initialState} from "reducers/InfiniteLoaderReducer";
import { allowFetching } from "actions/InfiniteLoaderActions";
import generateRandomNumber from 'utilities/generateRandomNumber'
import { photoProps } from 'utilities/getProps'


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

const generateRandomList = ()=>{
    let list = [];
    for (let i=0;i<15;i++){
        list[i] = `${generateRandomNumber(200,400)}px`;
    }
    return list;
}

export default function ExplorePage() {
    const [state, dispatch] = useReducer(InfiniteLoaderReducer, initialState);
    const [randomHeightList, setRandomHeightList] = useState(generateRandomList());
    const {dataList:photoList} = state;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    useEffect(() => {
        dispatch(allowFetching);
    }, []);

    useEffect(()=>{
        const heightListExtension = generateRandomList();
        setRandomHeightList([...randomHeightList,...heightListExtension]);
    },[photoList])

    const openShowcase = index=>{
        setInitialSlide(index);
        setModalIsOpen(true);
    }



    return (
        <>
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
                            const height = randomHeightList[i];
                            return (
                            <MasonryItem {...props} 
                                height={height}
                                onClick={()=>openShowcase(i)}/>)
                        })}
                    </MasonryContainer>
                </InfiniteLoader>
            </PageContainer>
            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={()=>setModalIsOpen(false)}>
                <Showcase 
                    photoList={photoList} 
                    initialSlide={initialSlide}
                    closeModal={()=>setModalIsOpen(false)}/>
            </CustomModal>
        </>
    );
}