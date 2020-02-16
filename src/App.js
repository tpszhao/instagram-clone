import React,{useState,useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios'
import Card from './Components/Card'
import './App.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let url = "https://source.unsplash.com/700x"

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [items, setItems] = useState([]);
  const searchBar = useRef();

  const loadMore = ()=>{
    axios.get(`https://source.unsplash.com/700x${getRandomInt(300,900)}?${searchValue}`)
    .then(data=>setItems([...items,data.request.responseURL]))
  }

  const loadMoreAsync = async()=>{
    try{
      const responses = [
        await axios.get(`${url}${getRandomInt(300,900)}?${searchValue}`),
        await axios.get(`${url}${getRandomInt(300,900)}?${searchValue}`),
        await axios.get(`${url}${getRandomInt(300,900)}?${searchValue}`)]
      const data = responses.map(response=>response.request.responseURL)
      setItems([...items, ...data])
    }catch{
      console.log("error")
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    setSearchValue(searchBar.current.value);
    setItems([]);
  }

  
  return (
    <>
      <div className="header">
        <form onSubmit={handleSubmit}>
          <input type="text" ref={searchBar}/>
        </form>
      </div>
      <div className="container">
        <div className="infinite_scroll">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMoreAsync}
            hasMore={items.length < 500}
            loader={<div key={0}>Loading ...</div>}
            useWindow={true}>
              {items.map(image=> <Card image={image}/>)}
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
