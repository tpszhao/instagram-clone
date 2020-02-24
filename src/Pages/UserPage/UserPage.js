import React,{useState,useEffect} from 'react'
import {toJson} from 'unsplash-js'
import {PhotoGrid} from 'Components'
import unsplash from 'API/unsplash'
import styles from './UserPage.module.css'

export default function UserPage(props) {
    const [user, setUser] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        setPhotos([]);
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
        <div className={styles.container}>
            <div className={styles.userheader}>
                <img 
                    className={styles.profile_image} 
                    src={user.profile_image.large} 
                    alt="avatar"/>
                <span className={styles.username}>{user.name}</span>
                <div className={styles.userstat}>
                    <span>{user.total_likes} likes</span>
                    <span>{user.total_photos} photos</span>
                    <span>{user.followers_count} followers</span>
                </div>
            </div>
            <PhotoGrid
                photos={photos}
                setPhotos={setPhotos}
                query='users'
                searchValue={user.username} />
        </div>
    )
}
