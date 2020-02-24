import React,{useState,useEffect} from 'react'
import {PhotoGrid} from 'Components'
import styles from './SearchPage.module.css'

export default function SearchPage(props) {
    const searchValue = props.match.params.searchValue;
    const [total, setTotal] = useState(0);
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        setPhotos([]);
        setTotal(0);
    }, [props.match.params.username]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.name}>Search Result for "{searchValue}"</span>
                <div className={styles.stat}>
                    <span>{total} photos</span>
                </div>
            </div>
            <PhotoGrid
                photos={photos}
                setPhotos={setPhotos}
                query='search'
                setTotal={setTotal}
                searchValue={searchValue}/>
        </div>
    )
}
