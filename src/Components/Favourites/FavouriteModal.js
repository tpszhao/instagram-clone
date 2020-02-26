import React,{useState,useRef} from 'react'
import styled from 'styled-components'
import Image from "react-graceful-image"
import {toJson} from 'unsplash-js'
import unsplash from 'API/unsplash'

const Container = styled.div`
    position:relative;
    width:750px;
    height:500px;
    max-height:80vh;
    max-width:80vw;
    display:flex;
    flex-direction:column;
    flex-wrap:nowrap;
    justify-content:space-around;
    align-items:center;
    border: 1px solid rgb(219,219,219);
    border-radius:5px;
    padding:30px;
`;

const SearchBar = styled.input`
    line-height: 20px;
    text-align: center;
    outline: none;
    border: 1px solid rgb(219,219,219);
`;

const Photo = styled(Image)`
    margin:10px;
    max-width:70%;
    max-height:70%;
    object-fit:scale-down;
`;

const ButtonIcon = styled.button`
    outline:none;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    color:rgb(150,150,150);
    border: 2px solid rgb(219,219,219);
    background-color:white;
    border-radius: 3px;
    &:hover{
        cursor: pointer;
        background-color:rgb(219,219,219,0.3);
    };
    &:active{
        cursor: pointer;
        background-color:rgb(219,219,219);
        color: white;
    };
`;

export default function FavouriteModal({cardlist,setCardlist,closeModal}) {
    const [message, setMessage] = useState(null);
    const [card, setCard] = useState(null);
    const searchBar = useRef('');

    const handleSubmit = e =>{
        e.preventDefault();
        let newKeyword = searchBar.current.value;
        let repeated = cardlist.find(card=>card.keyword === newKeyword)||false;
        if(repeated){
            let message = `${newKeyword} already exists, please try something else`;
            setMessage(message);
            return
        }
        unsplash.photos.getRandomPhoto({query:newKeyword})
            .then(toJson)
            .then(Json=>{
                if (Json.errors){
                    let message = `We couldn't find any pictures for "${newKeyword}", please try something else`;
                    setMessage(message);
                    return;
                }
                setMessage(null);
                setCard({keyword:newKeyword,photo:Json,time:Date.now()});
            })
    }
    
    const addToCollection = ()=>{
        setCardlist([...cardlist,card]);
        closeModal();
    }

    return (
        <Container>
            {message&&<div>{message}</div>}
            {!message&&card&&<Photo 
                                    src={card.photo.urls.regular} 
                                    placeholderColor={card.photo.color}
                                    alt="placeholder"/>}
            <form onSubmit={handleSubmit}>
                <SearchBar ref={searchBar} type="text" placeholder="Search..."/>
            </form>
            {card&&<ButtonIcon onClick={addToCollection}>Add to Collection</ButtonIcon>}
        </Container>
    )
}
