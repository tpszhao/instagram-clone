import React,{useState} from 'react'
import {PhotoGrid} from 'Components'
import styles from './SearchPage.module.css'

export default function SearchPage(props) {
    const searchvalue = props.match.params.searchvalue;
    const [total, setTotal] = useState(0);
    const [photos, setPhotos] = useState([]);


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.name}>Search Result for "{searchvalue}"</span>
                <div className={styles.stat}>
                    <span>{total} photos</span>
                </div>
            </div>
            <PhotoGrid
                photos={photos}
                setPhotos={setPhotos}
                query='search'
                setTotal={setTotal}
                searchValue={searchvalue}/>
        </div>
    )
}
