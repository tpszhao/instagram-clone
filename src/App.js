import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {NavBar} from 'Components'
import {HomePage,UserPage,SearchPage,CollectionPage} from 'Pages'
import './App.css'

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/user/:username" component={UserPage} />   
        <Route path="/collection/:collectionID" component={CollectionPage} />   

        <Route path="/search/:searchType/:searchValue" component={SearchPage} />      
      </Switch>
    </Router>
  );
}

export default App;
