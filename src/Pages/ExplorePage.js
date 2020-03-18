import React, { useEffect, useContext, useState} from "react";
import styled from "styled-components";
import { 
    InfiniteLoader, 
    MasonryContainer, 
    MasonryItem,
    GridLoader,
    CustomModal,
    Showcase
} from "Components";
import { PhotoDataContext } from 'context';
import { ALLOW_FETCHING } from "actions/InfiniteLoaderActions";
import { photoProps } from 'utilities/getProps';


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


export default function ExplorePage({match:{ path }}) {
    const { state, dispatch } = useContext(PhotoDataContext);
    const { dataList:photoList, heightList } = state[path];

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    useEffect(() => {
        dispatch(ALLOW_FETCHING(path));
    }, []);

    const openShowcase = index=>{
        setInitialSlide(index);
        setModalIsOpen(true);
    }

    return (
        <>
            <PageContainer>
                <InfiniteLoader
                    route={path}
                    query="photos"
                    searchType="listPhotos"
                    orderedBy="popular"
                    loader={<GridLoader key={0} />}>
                    <MasonryContainer>
                        {photoList.map((photo,i)=>{
                            const props = photoProps(photo);
                            const height = heightList[i];
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
