import React, { useEffect, useContext, useState} from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { 
    InfiniteLoader, 
    MasonryContainer, 
    MasonryItem,
    GridLoader,
    CustomModal,
    Showcase
} from "Components";
import { PhotoDataContext } from 'context';
import { ALLOW_FETCHING } from "actions/infiniteLoaderActions";
import { photoProps } from 'utilities/getProps';


const PageContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 946px;
    @media only screen and (max-width: 936px) {
        width: 100%;
    }
`;


export default function ExplorePage({
    match:{ path }
}:RouteComponentProps) {
    const [state, dispatch] = useContext(PhotoDataContext);
    const { dataList:photoList, heightList } = state[path];

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [initialSlide, setInitialSlide] = useState<number>(0);

    useEffect(() => {
        dispatch(ALLOW_FETCHING(path));
    }, []);

    const openShowcase = (index:number) =>{
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
                        {photoList.map((photo:any,i:number)=>{
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
