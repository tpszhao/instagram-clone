import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { NavBar } from "Components";
import { PhotoDataContextProvider } from "context";
import {
  HomePage,
  ExplorePage,
  SearchPage,
  UserPage,
  CollectionPage,
} from "Pages";
import { darkTheme, lightTheme } from "themes";
import { localGet, localSet } from "api/local";

const GlobalStyle = createGlobalStyle<any>`
  *{
      box-sizing: border-box;
      outline: none;
  }

  body {
    ${(props) => `
      background-color:${props.theme.bodyBackgroundColor};
      color:${props.theme.textColor};
    `}
  }
`;

function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);

  useEffect(() => {
    const darkModeHistory = localGet("darkModeEnabled", false);

    setDarkModeEnabled(darkModeHistory);
  }, []);

  useEffect(() => {
    localSet("darkModeEnabled", darkModeEnabled);
  }, [darkModeEnabled]);

  return (
    <Router>
      <ThemeProvider theme={darkModeEnabled ? darkTheme : lightTheme}>
        <GlobalStyle />
        <NavBar
          darkModeEnabled={darkModeEnabled}
          setDarkModeEnabled={setDarkModeEnabled}
        />
        <PhotoDataContextProvider>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/explore" exact component={ExplorePage} />
            <Route path="/user/:username" component={UserPage} />
            <Route
              path="/collection/:collectionID"
              component={CollectionPage}
            />
            <Route
              path="/search/:searchType/:searchValue"
              component={SearchPage}
            />
          </Switch>
        </PhotoDataContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
