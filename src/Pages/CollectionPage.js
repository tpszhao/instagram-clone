import React,{useState,useEffect,useContext} from 'react'
import styled from 'styled-components';
import {toJson} from 'unsplash-js'
import {
    GridHeader,
    GridContainer,
    GridItem,
    GridLoader,
    InfiniteLoader,
    CustomModal,
    Showcase
} from 'Components'
import { PhotoDataContext } from 'Context'
import unsplash from 'API/unsplash'
import { ALLOW_FETCHING } from 'Actions/InfiniteLoaderActions'
import getProps from 'Utilities/getProps'
import { collectionIcon } from 'SVG'


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

const CollectionHeader = ({collection}) => {
    const {
        cover_photo,
        title,
        total_photos=0
    } = collection;

    const src = cover_photo ? cover_photo.urls.thumb : collectionIcon;

    const totalPhotos = `${total_photos} photos`

    const statList = [totalPhotos];
    
    return <GridHeader 
                src={src} 
                title={title} 
                statList={statList}/>
}


export default function CollectionPage({match}) {
    const [collection, setCollection] = useState(null);
    const {state, dispatch} = useContext(PhotoDataContext);
    const { dataList } = state.gridPage;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    useEffect(() => {
        dispatch(ALLOW_FETCHING(match.path));
        unsplash.collections
            .getCollection(match.params.collectionID)
            .then(toJson)
            .then(json => {
                setCollection(json);
            }).catch(()=>{
                setCollection(null);
            });
    }, [match.params.collectionID]);

    const openShowcase = index=>{
        setInitialSlide(index);
        setModalIsOpen(true);
    }
    
    if(!collection||collection.errors) return null;
    return (
        <>
            <PageContainer>
                <CollectionHeader collection={collection}/>
                <InfiniteLoader
                    route={match.path}
                    query='collections'
                    searchType='getCollectionPhotos'
                    searchValue={collection.id}
                    loader={<GridLoader key='loading'/>}>
                    <GridContainer>
                        {dataList.map((item,i)=>{
                            const props = getProps.photos(item);
                            return <GridItem {...props} onClick={()=>openShowcase(i)}/>
                        })}
                    </GridContainer>
                </InfiniteLoader>
            </PageContainer>
            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={()=>setModalIsOpen(false)}>
                <Showcase 
                    photoList={dataList} 
                    initialSlide={initialSlide}
                    closeModal={()=>setModalIsOpen(false)}/>
            </CustomModal>
        </>
    )
}
