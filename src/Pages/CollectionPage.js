import React,{useState,useEffect,useReducer} from 'react'
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
import unsplash from 'api/unsplash'
import infiniteLoaderReducer, { initialState } from 'reducers/infiniteLoaderReducer'
import { reset, allowFetching } from 'actions/infiniteLoaderActions'
import getProps from 'utilities/getProps'
import { collectionIcon } from 'assets/SVG'


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


export default function CollectionPage(props) {
    const [collection, setCollection] = useState(null);
    const [state, dispatch] = useReducer(infiniteLoaderReducer, initialState);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    useEffect(() => {
        dispatch(reset);
        dispatch(allowFetching);
        unsplash.collections
            .getCollection(props.match.params.collectionID)
            .then(toJson)
            .then(json => {
                setCollection(json);
            }).catch(()=>{
                setCollection(null);
            });
    }, [props.match.params.collectionID]);

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
                    query='collections'
                    searchType='getCollectionPhotos'
                    searchValue={collection.id}
                    state={state}
                    dispatch={dispatch}
                    loader={<GridLoader key='loading'/>}>
                    <GridContainer>
                        {state.dataList.map((item,i)=>{
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
                    photoList={state.dataList} 
                    initialSlide={initialSlide}
                    closeModal={()=>setModalIsOpen(false)}/>
            </CustomModal>
        </>
    )
}
