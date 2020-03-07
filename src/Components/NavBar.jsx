import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { localGet, localSet } from "API/local";
import home from "SVG/home.svg"

const SearchBar = styled.div`
  background-color: white;
  position: sticky;
  top: 0px;
  z-index: 20;
  width: 100%;
  max-width: 100vw;
  height: 52px;
  border-bottom: 1px solid rgb(219, 219, 219);
  display:flex;
  justify-content:center;
  align-items: center;
`;

const Form = styled.form`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
`;

const SearchInput = styled.input`
  position: relative;
  z-index: 2;
  width: 171px;
  line-height: 20px;
  outline: none;
  text-align:center;
  border: 1px solid rgb(219, 219, 219);
  &:focus{
    text-align:left;
  }
`;

const SearchSuggestions = styled.div`
  ${props => !props.active && "display:none;"}
  top: 37px;
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

const IconBar = styled.div`
  width:944px;
  max-width:100vw;
  margin:auto;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  @media only screen and (max-width: 976px) {
    ${props=>(props.pathname === "/")&&'width:616px'};
  }
`;

const Icon = styled.div`
  width:40px;
  height:40px;
  background-size:cover;
  background-image:${props=>`url("${props.src}")`};
  cursor:pointer;
`;



function NavBar({ history, location }) {
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
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="search for photos..."
          onFocus={() => setIsSearching(true)}
          onBlur={onBlur}
          value={inputValue}
          onChange={changeSuggestions}/>
      </Form>
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
            }}>
            Clear History
          </SearchItem>
        )}
      </SearchSuggestions>
      <IconBar pathname={location.pathname}>
        <Icon src={home} onClick={()=>history.push('/')}/>
      </IconBar>
    </SearchBar>
  );
}

export default withRouter(NavBar);
