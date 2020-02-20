import React,{useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios'
import styles from './HomePage.module.css'
import {Card} from '../../Components';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let url = "https://source.unsplash.com/700x"

export default function HomePage() {
    const [items, setItems] = useState([]);
    const loadMoreAsync = async()=>{
        try{
            const responses = [
            await axios.get(`${url}${getRandomInt(300,900)}`),
            await axios.get(`${url}${getRandomInt(300,900)}`),
            await axios.get(`${url}${getRandomInt(300,900)}`)]
            const data = responses.map(response=>response.request.responseURL)
            setItems([...items, ...data])
        }catch{
            console.log("error")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.infinite_scroll}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMoreAsync}
                    hasMore={items.length < 500}
                    loader={<div key={0}>Loading ...</div>}
                    useWindow={true}>
                    {items.map(image=> <Card image={image}/>)}
                </InfiniteScroll>
            </div>
            <div className={styles.sideBar}>
                <div className={styles.sideItem}>placeholder</div>
            </div>
        </div>
    )
}
