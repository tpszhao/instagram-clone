import React,{useState,useEffect,useReducer} from 'react'
import styled from 'styled-components';
import {toJson} from 'unsplash-js'
import {
    GridHeader,
    GridContainer,
    GridItem,
    GridLoader,
    InfiniteLoader
} from 'Components'
import unsplash from 'API/unsplash'
import InfiniteLoaderReducer, { initialState } from 'Reducers/InfiniteLoaderReducer'
import { reset, allowFetching } from 'Actions/InfiniteLoaderActions'
import getProps from 'Utilities/getProps'


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


export default function UserPage(props) {
    const [user, setUser] = useState(null);
    const [state, dispatch] = useReducer(InfiniteLoaderReducer, initialState);

    useEffect(() => {
        dispatch(reset);
        dispatch(allowFetching);
        unsplash.users
            .profile(props.match.params.username)
            .then(toJson)
            .then(json => {
                setUser(json);
            }).catch(()=>{
                setUser(null);
            });
    }, [props.match.params.username]);
    
    if(!user||user.errors) return null;
    return (
        <PageContainer>
            <UserHeader user={user}/>
            <InfiniteLoader
                query='users'
                searchType='photos'
                searchValue={user.username}
                state={state}
                dispatch={dispatch}
                loader={<GridLoader key='loading'/>}>
                <GridContainer>
                    {state.dataList.map((item,i)=>{
                        const props = getProps.photos(item);
                        return <GridItem {...props} onClick={()=>console.log(i)}/>
                    })}
                </GridContainer>
            </InfiniteLoader>
        </PageContainer>
    )
}
