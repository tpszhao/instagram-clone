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
import infiniteLoaderReducer, {initialState} from "Reducers/infiniteLoaderReducer";
import { ALLOW_FETCHING } from "Actions/InfiniteLoaderActions";
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

const generateRandomList = ()=>{
    let list = [];
    for (let i=0;i<15;i++){
        list[i] = `${generateRandomNumber(200,400)}px`;
    }
    return list;
}

export default function ExplorePage(props) {
    console.log(props);
    const [state, dispatch] = useReducer(infiniteLoaderReducer, initialState);
    const [randomHeightList, setRandomHeightList] = useState(generateRandomList());
    const {dataList:photoList} = state;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    useEffect(() => {
        dispatch(ALLOW_FETCHING);
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
