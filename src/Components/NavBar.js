import React,{useRef,useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {localGet,localSet} from 'API/local'

const Header = styled.div`
    background-color: white;
    top: 0px;
    position: sticky;
    width: 100vw;
    max-width: 100%;
    height: 52px;
    border-bottom: 1px solid rgb(219,219,219);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 20;
`;

const SearchBar = styled.input`
    position:relative;
    z-index:1;
    width:171px;
    line-height: 20px;
    text-align: center;
    outline: none;
    border: 1px solid rgb(219,219,219);
`;

const SearchSuggestions = styled.div`
    ${props=>!props.active&&"display:none;"}
    padding-top:20px;
    top:17px;
    width:171px;
    background-color:white;
    background-clip: content-box;
    text-align:center;
    color:rgb(180,180,180);
    position:absolute;
    border:1px solid rgb(219,219,219);
    border-top: none;
    cursor:text;
    z-index:2;
`;

const SearchItem = styled.div`
    padding:1px;
    &:hover{
        cursor: pointer;
        background-color:rgb(219,219,219);
        color:white;
    }
`;

function NavBar({history}) {
    const inputRef = useRef('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchSuggestions, setSearchSuggestion] = useState([]);

    useEffect(() => {
        let history = localGet("SearchHistory");
        setSearchHistory(history);
    }, [])

    useEffect(() => {
        changeSuggestions();
        localSet("SearchHistory",searchHistory);
    }, [searchHistory])

    const changeSuggestions=()=>{
        console.log("onchange event")
        const searchValue=inputRef.current.value;
        const suggestions = searchHistory.filter(item=>item.includes(searchValue));
        setSearchSuggestion(suggestions);
    }

    const handleSubmit = e=>{
        const searchValue = inputRef.current.value;
        redirect(searchValue);
        e.preventDefault();
    }

    const redirect = (value="search")=>{
        let removeRepeat = searchHistory.filter(item=>item!==value);
        inputRef.current.value=value;
        history.push(`/search/${value}`)
        setSearchHistory([value,...removeRepeat]);
        setIsSearching(false);
    }


    return (
        <Header>
            <form onSubmit={handleSubmit}>
                <SearchBar 
                    type="text"
                    placeholder="search for photos..."
                    ref={inputRef}
                    onClick={()=>setIsSearching(true)}
                    onFocus={()=>setIsSearching(true)}
                    onChange={changeSuggestions}
                    />
            </form>
            <SearchSuggestions 
                active={isSearching}
                onMouseLeave={()=>setIsSearching(false)}>
                {searchSuggestions.map(item=>{
                    return (<SearchItem key={item} onClick={()=>redirect(item)}>
                                {item}
                            </SearchItem>)
                })}
                {(searchSuggestions.length > 0)&&
                <SearchItem 
                    onClick={()=>{setSearchHistory([])}}>Clear History</SearchItem>}
            </SearchSuggestions>
        </Header>
    )
}

export default withRouter(NavBar)