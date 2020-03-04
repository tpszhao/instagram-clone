import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { localGet, localSet } from "API/local";

const SearchBar = styled.div`
  background-color: white;
  top: 0px;
  position: sticky;
  width: 100vw;
  max-width: 100%;
  height: 52px;
  border-bottom: 1px solid rgb(219, 219, 219);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 20;
`;

const SearchInput = styled.input`
  position: relative;
  z-index: 2;
  width: 171px;
  line-height: 20px;
  text-align: left;
  outline: none;
  border: 1px solid rgb(219, 219, 219);
`;

const SearchSuggestions = styled.div`
  ${props => !props.active && "display:none;"}
  padding-top:20px;
  top: 17px;
  width: 171px;
  background-color: white;
  background-clip: content-box;
  text-align: center;
  color: rgb(180, 180, 180);
  position: absolute;
  border: 1px solid rgb(219, 219, 219);
  border-top: none;
  cursor: text;
  z-index: 1;
`;

const SearchItem = styled.div`
  padding: 1px;
  &:hover {
    cursor: pointer;
    background-color: rgb(219, 219, 219);
    color: white;
  }
`;

function NavBar({ history }) {
  const [inputValue, setInputValue] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuggestions, setSearchSuggestion] = useState([]);

  useEffect(() => {
    const savedSearchHistory = localGet("SearchHistory");
    setSearchHistory(savedSearchHistory);
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
  };

  const handleSubmit = e => {
    e.preventDefault();
    redirect(inputValue);
  };

  const onBlur = ()=>{
    setTimeout(()=>setIsSearching(false),150);
  }

  return (
    <SearchBar>
      <form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="search for photos..."
          onFocus={() => setIsSearching(true)}
          onBlur={onBlur}
          value={inputValue}
          onChange={changeSuggestions}/>
      </form>
      <SearchSuggestions active={isSearching}>
        {searchSuggestions.map(item => {
          return (
            <SearchItem key={item} onClick={() => redirect(item)}>
              {item}
            </SearchItem>
          );
        })}
        {searchSuggestions.length > 0 && (
          <SearchItem
            onClick={() => {
              setSearchHistory([]);
              setSearchSuggestion([]);
            }}
          >
            Clear History
          </SearchItem>
        )}
      </SearchSuggestions>
    </SearchBar>
  );
}

export default withRouter(NavBar);
