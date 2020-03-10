import React from 'react';
import {HighlightAddCollection,Showcase} from 'Components';

export default function HighlightModal({
    showcasePhotos=[],
    initialSlide=0,
    cardList,
    setCardList,
    closeModal
}) {
    if(showcasePhotos.length === 0){
        return (
            <HighlightAddCollection
                cardList={cardList}
                setCardList={setCardList}
                closeModal={closeModal}/>)
    }
    return (
        <Showcase
            closeModal={closeModal}
            photoList={showcasePhotos}
            initialSlide={initialSlide}/>
    )
}
