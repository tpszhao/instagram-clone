import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import {toJson} from 'unsplash-js';
import unsplash from 'API/unsplash';
import {localGet,localSet} from 'API/local';
import {
    HighlightAddCard,
    HighlightCard,
    ButtonIcon} from 'Components'


const Card = styled.div`
    width: 296px;
    min-height: 60px;
    border: 1px solid rgb(219,219,219);
    border-radius: 3px;
    position: relative;
    margin-top:16px;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media only screen and (max-width: 976px){
        width:100%;
    }

`;

const Header = styled.div`
    position:relative;
    display: flex;
    justify-content:center;
    align-items: center;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid rgb(219,219,219);
`;

const PhotoContainer = styled.div`
    display:flex;
    flex-direction:column;
    @media only screen and (max-width: 976px){
        flex-direction:row;
        justify-content:space-around;
        width:100%;
    }
`;



const modalStyle = {
    content : {
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        border:'none',
        padding:'none',
        marginRight:'-50%',
        transform:'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');
export default function HighlightsMenu({setStickyPos}) {
    const [cardlist, setCardlist] = useState([]);
    const [modalisOpen, setModalisOpen] = useState(false);

    useEffect(() => {
        let keywordList = localGet("Highlights",[]);
        Promise.all(keywordList.map(fetchPhoto))
            .then(photoLists=>updateCardlist(photoLists,keywordList));
    }, [])

    useEffect(() => {
        let keywordlist = cardlist.map(card=>card.keyword);
        localSet("Highlights",keywordlist);
        if(cardlist.length > 1){
            setStickyPos((cardlist.length-1)*316);
        }else{
            setStickyPos(0);
        }
    }, [cardlist])

    const fetchPhoto = async keyword =>{
        return unsplash.photos.getRandomPhoto({query:keyword,count:10}).then(toJson);
    }

    const updateCardlist = (photoLists,keywordList)=>{
        let newCardList = photoLists.map((photolist,i)=>{
            return {keyword:keywordList[i],photolist}
        })
        setCardlist(newCardList);
    }

    const deleteCard = card=>{
        let newCardList = cardlist.filter(item=>item!==card);
        setCardlist(newCardList);
    }
    
    return (
        <>
            <Card length={cardlist.length}> 
                <Header>
                    <span>Highlights</span>
                    {cardlist.length<3
                    &&<ButtonIcon 
                    style={{top:'2px',right:'12px'}}
                    onClick={()=>setModalisOpen(true)}/>}
                </Header>
                <PhotoContainer>
                    {cardlist.map(card=>{
                        return <HighlightCard key={card.keyword} card={card} deleteCard={deleteCard}/>
                    })}
                </PhotoContainer>
            </Card>
            <Modal
                isOpen={modalisOpen}
                onRequestClose={()=>{setModalisOpen(false)}}
                style={modalStyle}
                >
                <HighlightAddCard 
                            cardlist={cardlist}
                            setCardlist={setCardlist}
                            closeModal={()=>{setModalisOpen(false)}}/>
            </Modal>
        </>
    )
}
