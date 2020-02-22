import React from 'react'
import styles from './HomePage.module.css'
import {LatestPhoto} from '../../Components'

export default function HomePage() {
    return (
        <div className={styles.container}>
            <div className={styles.infinite_scroll}>
                <LatestPhoto/>
            </div>
            <div className={styles.sideBar}>
                <div className={styles.sideItem}>placeholder</div>
            </div>
        </div>
    )
}
