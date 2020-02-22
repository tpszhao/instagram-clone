import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {NavBar} from './Pages/Components'
import {HomePage,UserPage} from './Pages'

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/user/:username" component={UserPage} />      
      </Switch>
    </Router>
  );
}

export default App;
