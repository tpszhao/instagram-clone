import React,{useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios'
import './App.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function App() {
  const [items, setItems] = useState([]);

  const loadMore = ()=>{
    axios.get(`https://source.unsplash.com/700x${getRandomInt(300,900)}`)
    .then(data=>setItems([...items,data.request.responseURL]))
  }

  
  return (
    <>
      <div className="header">
        <form onSubmit={e=>e.preventDefault()}>
          <input type="text"/>
        </form>
      </div>
      <div className="container">
        <div className="infinite_scroll">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={items.length < 500}
            loader={<div>Loading ...</div>}
            useWindow={true}>
              {items.map(item=>{
                return <div className="Card"><img src={item} alt="placeholder"/></div>
              })}
          </InfiniteScroll>
        </div>
        <div className="sideBar">
          <div className="sideItem">placeholder</div>
        </div>
      </div>
    </>
  );
}

export default App;
