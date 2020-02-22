import React from 'react'
import styles from './Cell.module.css'

export default function Cell({photo}) {
    return (
            <img src={photo} alt="placeholder" className={styles.photo}/>
        // <div className={styles.cell}>
        // </div>
    )
}
