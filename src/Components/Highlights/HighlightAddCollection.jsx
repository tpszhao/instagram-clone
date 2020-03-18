import React,{useState} from 'react'
import {toJson} from 'unsplash-js'
import unsplash from 'api/unsplash'
import capitalize from 'utilities/capitalize'
import { ButtonIcon } from 'Components';
import { searchIcon } from "assets/svg"
import {
    ModalContainer, 
    Form,
    SearchInput, 
    Photo, 
    AddToCollection
} from './Highlights.styles'

export default function HighlightAddCollection({cardList,setCardList,closeModal}) {
    const [message, setMessage] = useState("Search for photos below...");
    const [card, setCard] = useState(null);
    const [searchValue, setSearchValue] = useState();
    const [isSearching, setIsSearching] = useState(false);

    const onChange = e=>{
        setSearchValue(e.target.value);
        setIsSearching(true);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        const newKeyword = capitalize(searchValue.trim());
        setSearchValue(newKeyword);
        const repeated = cardList.find(card=>card.keyword === newKeyword)||false;
        if(repeated){
            const message = `${newKeyword} already exists, please try something else`;
            setMessage(message);
            return
        }
        unsplash.photos.getRandomPhoto({query:newKeyword,count:10})
            .then(toJson)
            .then(Json=>{
                if (Json.errors){
                    const message = `We couldn't find any pictures for "${newKeyword}", please try something else`;
                    setMessage(message);
                    return;
                }
                setMessage(null);
                setCard({keyword:newKeyword,photoList:Json});
            })
    }
    
    const addToCollection = ()=>{
        setCardList([...cardList,card]);
        closeModal();
    }

    return (
        <ModalContainer>
            {message&&<div>{message}</div>}
            {!message&&card&&
                <Photo 
                    src={card.photoList[0].urls.regular} 
                    alt=""/>}
            <Form onSubmit={handleSubmit}>
                <ButtonIcon 
                    width='28px' 
                    height='28px'
                    onClick={handleSubmit}
                    src={searchIcon} />
                <SearchInput 
                    onChange={onChange}
                    value={searchValue} 
                    onFocus={()=>setIsSearching(true)}
                    onBlur={()=>setIsSearching(false)}
                    type="text" 
                    placeholder="Search here!"/>
                <ButtonIcon 
                    opacity={isSearching?1:0}
                    width='14px' 
                    height='14px'
                    rotate={45}
                    onClick={()=>setSearchValue("")}/>
            </Form>
            {card&&
            <AddToCollection 
                onClick={addToCollection}>
                Add to Collection
            </AddToCollection>}
        </ModalContainer>
    )
}
