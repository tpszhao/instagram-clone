import React,{useState} from 'react'
import {toJson} from 'unsplash-js'
import unsplash from 'API/unsplash'
import capitalize from 'Utilities/capitalize'
import {
    ModalContainer, 
    SearchInput, 
    Photo, 
    AddToCollection
} from './Highlights.styles'

export default function HighlightAddCollection({cardList,setCardList,closeModal}) {
    const [message, setMessage] = useState(null);
    const [card, setCard] = useState(null);
    const [searchValue, setSearchValue] = useState();

    const onChange = e=>{
        setSearchValue(e.target.value);
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
                    alt="placeholder"/>}
            <form onSubmit={handleSubmit}>
                <SearchInput 
                    onChange={onChange}
                    value={searchValue} 
                    type="text" 
                    placeholder="Search for photos"/>
            </form>
            {card&&<AddToCollection onClick={addToCollection}>Add to Collection</AddToCollection>}
        </ModalContainer>
    )
}
