import React,{useState,useRef} from 'react'
import {toJson} from 'unsplash-js'
import unsplash from 'API/unsplash'
import {ModalContainer, SearchInput, Photo, ButtonIcon} from './Highlights.styles'

export default function HighlightModal({cardList,setCardList,closeModal}) {
    const [message, setMessage] = useState(null);
    const [card, setCard] = useState(null);
    const searchBar = useRef('');

    const handleSubmit = e =>{
        e.preventDefault();
        let newKeyword = searchBar.current.value;
        let repeated = cardList.find(card=>card.keyword === newKeyword)||false;
        if(repeated){
            let message = `${newKeyword} already exists, please try something else`;
            setMessage(message);
            return
        }
        unsplash.photos.getRandomPhoto({query:newKeyword,count:10})
            .then(toJson)
            .then(Json=>{
                if (Json.errors){
                    let message = `We couldn't find any pictures for "${newKeyword}", please try something else`;
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
            {!message&&card&&<Photo 
                                    src={card.photoList[0].urls.regular} 
                                    placeholderColor={card.photoList[0].color}
                                    alt="placeholder"/>}
            <form onSubmit={handleSubmit}>
                <SearchInput ref={searchBar} type="text" placeholder="Search..."/>
            </form>
            {card&&<ButtonIcon onClick={addToCollection}>Add to Collection</ButtonIcon>}
        </ModalContainer>
    )
}
