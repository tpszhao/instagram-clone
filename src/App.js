import React, { useState, useRef, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import Card from "./Components/Card";
import "./App.css";

const unsplash = new Unsplash({
  accessKey: "14ed6077258d5e77a9c112386815899f4fcc60dd9feba45dbd9f6bea66b94f92"
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let url = "https://source.unsplash.com/700x";

const Home = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreAsync = async () => {
    unsplash.photos
      .listPhotos(page, 15, "latest")
      .then(toJson)
      .then(json => {
        console.log(json);
        setItems([...items, ...json]);
        setPage(page + 1);
        if (!json.length) {
          setHasMore(false);
        }
      });
  };

  return (
    <div className="container">
      <div className="infinite_scroll">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadMoreAsync}
          hasMore={hasMore}
          loader={<div>Loading ...</div>}
        >
          {items.map(image => (
            <Card key={image.id} image={image} />
          ))}
        </InfiniteScroll>
      </div>
      <div className="sideBar">
        <div className="sideItem">placeholder</div>
      </div>
    </div>
  );
};

const User = props => {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    unsplash.users
      .profile(props.match.params.username)
      .then(toJson)
      .then(json => {
        setUser(json);
      });
  }, []);

  useEffect(() => {
    unsplash.users
      .profile(props.match.params.username)
      .then(toJson)
      .then(json => {
        setUser(json);
        setPage(0);
        setPhotos([]);
      });
  }, [props.match.params.username]);

  const loadMoreAsync = async () => {
    unsplash.users
      .photos(props.match.params.username, page, 10)
      .then(toJson)
      .then(json => {
        setPhotos([...photos, ...json]);
        setPage(page + 1);
        if (!json.length) {
          setHasMore(false);
        }
      });
  };
  if (!user) return null;
  return (
    <div>
      <h1>{user.username}</h1>
      <div className="container">
        <div className="infinite_scroll">
          <InfiniteScroll
            pageStart={1}
            loadMore={loadMoreAsync}
            hasMore={hasMore}
            loader={<div>Loading ...</div>}
          >
            {photos.map(image => (
              <Card key={image.id} image={image} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <div className="header"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user/:username" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
