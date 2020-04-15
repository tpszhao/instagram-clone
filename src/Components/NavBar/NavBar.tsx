import React, { useReducer, useEffect, useRef } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { ButtonIcon } from "Components";
import { homeIcon, searchIcon, sun, moon, exploreIcon } from "assets/svg";
import navBarSearchReducer, {
  initialState,
} from "reducers/navBarSearchReducer";
import {
  ToolBar,
  Form,
  SearchInput,
  SearchSuggestionContainer,
  SuggestionItem,
  IconBar,
  RightSideIconContainer,
} from "./NavBar.styles";

import {
  GET_LOCAL,
  REDIRECT,
  CHANGE_SUGGESTIONS,
  ON_BLUR,
  START_SEARCHING,
  CLEAR_SEARCH_TERM,
  CLEAR_HISTORY,
} from "actions/navBarActions";

const DarkModeToggleContainer = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: relative;
`;

const DarkModeToggleIcon = styled.div<{
  isVisible: boolean;
  src: string;
}>`
  position:absolute;
  width:100%;
  height:100%;
  opacity:${(props) => (props.isVisible ? 1 : 0)};
  background-image:url("${(props) => props.src}");
  background-size:cover;
  background-position:center center;
  transition: 0.4s;
`;

interface Props extends RouteComponentProps {
  history: any;
  location: any;
  darkModeEnabled: boolean;
  setDarkModeEnabled: any;
}

function NavBar({
  history,
  location,
  darkModeEnabled,
  setDarkModeEnabled,
}: Props) {
  const searchInput = useRef<HTMLInputElement>(null);
  const [{ inputValue, isSearching, searchSuggestions }, dispatch] = useReducer(
    navBarSearchReducer,
    initialState
  );

  useEffect(() => {
    dispatch(GET_LOCAL);
  }, []);

  const changeSuggestions = (e: any) => {
    const searchValue = e.target.value;
    dispatch(CHANGE_SUGGESTIONS(searchValue));
  };

  const redirect = (value: string = "search") => {
    history.push(`/search/photos/${value}`);
    dispatch(REDIRECT(value));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchInput.current!.blur();
    !!inputValue && redirect(inputValue);
  };

  const onBlur = () => {
    setTimeout(() => {
      dispatch(ON_BLUR);
    }, 150);
  };

  return (
    <ToolBar>
      <Form onSubmit={handleSubmit}>
        <ButtonIcon
          width="28px"
          height="28px"
          onClick={handleSubmit}
          src={searchIcon}
        />
        <SearchInput
          data-cy="search_input"
          ref={searchInput}
          type="text"
          placeholder="search for photos..."
          onFocus={() => dispatch(START_SEARCHING)}
          onBlur={onBlur}
          value={inputValue}
          onChange={changeSuggestions}
        />
        <ButtonIcon
          opacity={isSearching ? 1 : 0}
          width="14px"
          height="14px"
          rotate={45}
          onClick={() => dispatch(CLEAR_SEARCH_TERM)}
        />
      </Form>
      <SearchSuggestionContainer active={isSearching}>
        {searchSuggestions.map((item: any) => {
          return (
            <SuggestionItem key={item} onClick={() => redirect(item)}>
              {item}
            </SuggestionItem>
          );
        })}
        {searchSuggestions.length > 0 && (
          <SuggestionItem onClick={() => dispatch(CLEAR_HISTORY)}>
            Clear History
          </SuggestionItem>
        )}
      </SearchSuggestionContainer>
      <IconBar pathname={location.pathname}>
        <ButtonIcon
          data-cy="home_page_icon"
          src={homeIcon}
          onClick={() => history.push("/")}
        />
        <RightSideIconContainer>
          <ButtonIcon
            width="24px"
            height="24px"
            margin="0px 5px"
            data-cy="explore_page_icon"
            src={exploreIcon}
            onClick={() => history.push("/explore")}
          />
          <DarkModeToggleContainer
            onClick={() => setDarkModeEnabled(!darkModeEnabled)}
          >
            <DarkModeToggleIcon src={sun} isVisible={!darkModeEnabled} />
            <DarkModeToggleIcon src={moon} isVisible={darkModeEnabled} />
          </DarkModeToggleContainer>
        </RightSideIconContainer>
      </IconBar>
    </ToolBar>
  );
}

export default withRouter(NavBar);
