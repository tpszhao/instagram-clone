import React,{useState,useEffect,useContext} from 'react'
import styled from 'styled-components';
import { RouteComponentProps } from "react-router-dom";
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
import { PhotoDataContext } from 'context'
import unsplash from 'api/unsplash'
import { ALLOW_FETCHING } from 'actions/infiniteLoaderActions'
import getProps from 'utilities/getProps'

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

interface UserType{
    username:string;
    total_likes:number;
    total_photos:number;
    followers_count:number;
    profile_image:{[key:string]:string};
    name:string;
    errors?:any;
}

const UserHeader = ({user}:{user:UserType}) => {
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

interface Params{
  username:string;
}

export default function UserPage({match}:RouteComponentProps<Params>) {
    const [user, setUser] = useState<UserType|null>(null);
    const [state, dispatch] = useContext(PhotoDataContext);
    const { dataList } = state.gridPage;

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [initialSlide, setInitialSlide] = useState<number>(0);


    useEffect(() => {
        dispatch(ALLOW_FETCHING(match.path));
        unsplash.users
            .profile(match.params.username)
            .then(toJson)
            .then((json:any) => {
                setUser(json);
            }).catch(()=>{
                setUser(null);
            });
    }, [match.params.username]);

    const openShowcase = (index:number)=>{
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
                        {dataList.map((item:any,i:number)=>{
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
