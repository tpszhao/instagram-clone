import React from 'react';
import {Showcase} from 'Components';
import {HighlightAddCollection} from './'

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
