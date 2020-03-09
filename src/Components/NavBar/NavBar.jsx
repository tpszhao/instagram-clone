import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { ButtonIcon } from 'Components';
import { localGet, localSet } from "API/local";
import homeIcon from "SVG/homeIcon.svg"
import searchIcon from "SVG/searchIcon.svg"
import {
  SearchBar,
  Form,
  SearchInput,
  SearchSuggestions,
  SuggestionItem,
  IconBar
} from './NavBar.styles'

function NavBar({ history, location }) {
  const searchInput = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuggestions, setSearchSuggestion] = useState([]);

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
    <SearchBar>
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
      <SearchSuggestions active={isSearching}>
        {searchSuggestions.map(item => {
          return (
            <SuggestionItem key={item} onClick={() => redirect(item)}>
              {item}
            </SuggestionItem>
          );
        })}
        {searchSuggestions.length > 0 && (
          <SuggestionItem
            onClick={() => {
              setSearchHistory([]);
              setSearchSuggestion([]);
            }}>
            Clear History
          </SuggestionItem>
        )}
      </SearchSuggestions>
      <IconBar pathname={location.pathname}>
        <ButtonIcon src={homeIcon} onClick={()=>history.push('/')}/>
      </IconBar>
    </SearchBar>
  );
}

export default withRouter(NavBar);
