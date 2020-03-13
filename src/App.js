import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {NavBar} from 'Components';
import {HomePage,UserPage,SearchPage,CollectionPage} from 'Pages';
import { darkTheme, lightTheme } from 'Themes'
import './App.css'

const GlobalStyle = createGlobalStyle`
  body {
    ${props=>`
      background-color:${props.theme.bodyBackgroundColor};
      color:${props.theme.textColor};
    `}
  }
`

function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <Router>
      <ThemeProvider theme={darkModeEnabled?darkTheme:lightTheme}>
        <GlobalStyle/>
        <NavBar 
          darkModeEnabled={darkModeEnabled}
          setDarkModeEnabled={setDarkModeEnabled}/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/user/:username" component={UserPage} />   
          <Route path="/collection/:collectionID" component={CollectionPage} />   
          <Route path="/search/:searchType/:searchValue" component={SearchPage} />      
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
