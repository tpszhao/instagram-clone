import React,{useRef} from 'react'
import {withRouter} from 'react-router-dom'
import styles from './NavBar.module.css'

function NavBar({history}) {
    const inputRef = useRef('')
    return (
        <div className={styles.header}>
            <form onSubmit={()=>{
                const searchvalue = inputRef.current.value;
                history.push(`/user/${searchvalue}`)
            }}>
                <input 
                    className={styles.input} 
                    type="text"
                    placeholder="search something..."
                    ref={inputRef}
                    />
            </form>
        </div>
    )
}

export default withRouter(NavBar)