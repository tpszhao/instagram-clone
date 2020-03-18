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
import { PhotoDataContext } from 'TestContext'
import unsplash from 'TestAPI/unsplash'
import { ALLOW_FETCHING } from 'TestActions/InfiniteLoaderActions'
import getProps from 'TestUtilities/getProps'

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

const UserHeader = ({user}) => {
    const statList = [
        `${user.total_likes} likes`,
        `${user.total_photos} photos`,
        `${user.followers_count} followers`
    ]
    return <GridHeader 
                src={user.profile_image.large} 
                title={user.name} 
                statList={statList}/>
}


export default function UserPage({match}) {
    const [user, setUser] = useState(null);
    const { state, dispatch } = useContext(PhotoDataContext);
    const { dataList } = state.gridPage;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);


    useEffect(() => {
        dispatch(ALLOW_FETCHING(match.path));
        unsplash.users
            .profile(match.params.username)
            .then(toJson)
            .then(json => {
                setUser(json);
            }).catch(()=>{
                setUser(null);
            });
    }, [match.params.username]);

    const openShowcase = index=>{
        setInitialSlide(index);
        setModalIsOpen(true);
    }
    
    if(!user||user.errors) return null;
    return (
        <>
            <PageContainer>
                <UserHeader user={user}/>
                <InfiniteLoader
                    route={match.path}
                    query='users'
                    searchType='photos'
                    searchValue={user.username}
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
                    showUserAvatar={false} 
                    closeModal={()=>setModalIsOpen(false)}/>
            </CustomModal>
        </>
    )
}
