import React from 'react'
import styles from './Card.module.css'

export default function Card({image}) {
    return (
        <div className={styles.Card}>
            <img className = {styles.image} src={image} alt="placeholder"/>
        </div>
    )
}
