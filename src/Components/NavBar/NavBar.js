import React from 'react'
import styles from './NavBar.module.css'

export default function NavBar() {
    return (
        <div className={styles.header}>
            <form>
                <input className={styles.input} type="text"/>
            </form>
        </div>
    )
}
