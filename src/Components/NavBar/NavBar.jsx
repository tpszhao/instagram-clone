import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { ButtonIcon } from 'Components';
import { localGet, localSet } from "TestAPI/local";
import { homeIcon,searchIcon,sun,moon, exploreIcon} from 'assets/svg'

import {
  ToolBar,
  Form,
  SearchInput,
  SearchSuggestionContainer,
  SuggestionItem,
  IconBar,
  RightSideIconContainer
} from './NavBar.styles'

const DarkModeToggleContainer = styled.div`
  cursor:pointer;
  width:40px;
  height:40px;
  position:relative;
`;

const DarkModeToggleIcon =styled.div`
  position:absolute;
  width:100%;
  height:100%;
  opacity:${props=>props.isVisible ? 1 : 0};
  background-image:url("${props=>props.src}");
  background-size:cover;
  background-position:center center;
  transition: 0.4s;
`;







function NavBar({ 
  history, 
  location,
  darkModeEnabled,
  setDarkModeEnabled
}) {
  const searchInput = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [SearchSuggestions, setSearchSuggestion] = useState([]);

  useEffect(() => {
    const savedSearchHistory = localGet("SearchHistory");

    setSearchHistory(savedSearchHistory);
    setSearchSuggestion(savedSearchHistory);
  }, []);

  useEffect(() => {
    localSet("SearchHistory", searchHistory);
  }, [searchHistory]);


  const changeSuggestions = e => {
    const searchValue = e.target.value;
    const suggestions = searchHistory.filter(item =>
      item.includes(searchValue)
      );
    setIsSearching(true);
    setInputValue(searchValue);
    setSearchSuggestion(suggestions);
  };

  const redirect = (value = "search") => {
    console.log("redirect");
    const removeRepeat = searchHistory.filter(item => item !== value);
    history.push(`/search/photos/${value}`);

    setSearchHistory([value, ...removeRepeat]);
    setIsSearching(false);
    setInputValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    searchInput.current.blur();
    redirect(inputValue);
  };

  const onBlur = ()=>{
    setTimeout(()=>{
      setIsSearching(false)
      setSearchSuggestion(searchHistory);
    },150);
  }

  return (
    <ToolBar>
      <Form onSubmit={handleSubmit}>
        <ButtonIcon 
          width='28px' 
          height='28px'
          onClick={handleSubmit}
          src={searchIcon} />
        <SearchInput
          ref={searchInput}
          type="text"
          placeholder="search for photos..."
          onFocus={() => setIsSearching(true)}
          onBlur={onBlur}
          value={inputValue}
          onChange={changeSuggestions}/>
        <ButtonIcon 
          opacity={isSearching?1:0}
          width='14px' 
          height='14px'
          rotate={45}
          onClick={()=>setInputValue("")}/>
      </Form>
      <SearchSuggestionContainer active={isSearching}>
        {SearchSuggestions.map(item => {
          return (
            <SuggestionItem key={item} onClick={() => redirect(item)}>
              {item}
            </SuggestionItem>
          );
        })}
        {SearchSuggestions.length > 0 && (
          <SuggestionItem
            onClick={() => {
              setSearchHistory([]);
              setSearchSuggestion([]);
            }}>
            Clear History
          </SuggestionItem>
        )}
      </SearchSuggestionContainer>
      <IconBar pathname={location.pathname}>
        <ButtonIcon src={homeIcon} onClick={()=>history.push('/')}/>
        <RightSideIconContainer>
          <ButtonIcon width='24px' height='24px'
            src={exploreIcon} 
            onClick={()=>history.push('/explore')}/>
          <DarkModeToggleContainer
            onClick={()=>setDarkModeEnabled(!darkModeEnabled)}>
            <DarkModeToggleIcon src={sun} isVisible={!darkModeEnabled}/>
            <DarkModeToggleIcon src={moon} isVisible={darkModeEnabled}/>
          </DarkModeToggleContainer>
        </RightSideIconContainer>
      </IconBar>
    </ToolBar>
  );
}

export default withRouter(NavBar);
