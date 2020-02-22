import React from 'react'
import styles from './Cell.module.css'

export default function Cell({photo}) {
    return (
        <div className={styles.cell}>
        <img src={photo} alt="placeholder" className={styles.photo}/>
        </div>
    )
}
