import React,{useRef} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.div`
    background-color: white;
    top: 0px;
    position: sticky;
    width: 100vw;
    max-width: 100%;
    height: 51px;
    border-bottom: 1px solid rgb(219,219,219);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 20;
`;

const SearchBar = styled.input`
    line-height: 20px;
    text-align: center;
    outline: none;
    border: 1px solid rgb(219,219,219);
`;

function NavBar({history}) {
    const inputRef = useRef('')
    return (
        <Header>
            <form onSubmit={e=>{
                e.preventDefault();
                const searchValue = inputRef.current.value;
                history.push(`/search/${searchValue}`)
            }}>
                <SearchBar 
                    type="text"
                    placeholder="search something..."
                    ref={inputRef}
                    />
            </form>
        </Header>
    )
}

export default withRouter(NavBar)