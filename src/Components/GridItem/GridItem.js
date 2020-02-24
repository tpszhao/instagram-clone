import React from 'react'
import Image from "react-graceful-image";
import styles from './GridItem.module.css'

export default function GridItem({photo}) {
    return (
        <div className={styles.cell}>
            <Image 
                src={photo.urls.regular} 
                placeholderColor={photo.color}
                alt="placeholder" 
                className={styles.photo}/>
            <div className={styles.photoStat}>
                <div>{`${photo.likes} likes`}</div>
            </div>
        </div>
    )
}
