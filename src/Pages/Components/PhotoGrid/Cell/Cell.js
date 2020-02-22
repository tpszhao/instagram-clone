import React from 'react'
import styles from './Cell.module.css'

export default function Cell({photo}) {
    return (
        <div className={styles.cell}>
            <img 
                src={photo.urls.regular} 
                alt="placeholder" 
                className={styles.photo}/>
            <div className={styles.photoStat}>
                <div>{`${photo.likes} likes`}</div>
            </div>
        </div>
    )
}
