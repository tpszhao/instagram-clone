import React,{useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';


function App() {
  const [items, setItems] = useState([]);

  const loadMore = async ()=>{
    fetch(`https://source.unsplash.com/1600x900/?beach`)
    .then(res=>{
      setItems([...items,res.url])
    }
    )
  }

  
  return (
    <>
      <div className="header">
        <form onSubmit={e=>e.preventDefault()}>
          <input type="text"/>
        </form>
      </div>
      <div className="body">
        <div className="infinite_scroll">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={items.length < 30}
            loader={<div>Loading ...</div>}
            useWindow={true}>
              {items.map(item=>{
                return <img src={item} alt="placeholder"/>
              })}
          </InfiniteScroll>
        </div>
        <div className="sideBar">
          <div className="SideItem">PlaceHolder</div>
        </div>
      </div>
    </>
  );
}

export default App;
