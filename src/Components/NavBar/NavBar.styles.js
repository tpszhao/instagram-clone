import styled from "styled-components";

export const SearchBar = styled.div`
    background-color: white;
    position: sticky;
    top: 0px;
    z-index:1;
    width: 100%;
    max-width: 100vw;
    height: 52px;
    border-bottom: 1px solid rgb(219, 219, 219);
    display:flex;
    justify-content:center;
    align-items: center;
`;

export const Form = styled.form`
    position:absolute;
    width:300px;
    max-width:calc(100% - 96px);
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);

    display:flex;
    justify-content:space-between;
    align-items:center;

    padding:0px 10px;
    border-radius:14px;
    border: 1px solid rgb(219, 219, 219);
`;

export const SearchInput = styled.input`
    position: relative;
    z-index: 2;
    width: 80%;
    line-height: 28px;
    outline: none;
    border:none;
    text-align:center;
    padding: 0px 20px;
    &:focus{
        text-align:left;
    } 
`;

export const SearchSuggestions = styled.div`
    ${props => !props.active && "display:none;"}
    top: 44px;
    width:300px;
    max-width:calc(100% - 96px);
    background-color: white;
    background-clip: content-box;
    text-align: center;
    color: rgb(180, 180, 180);
    position: absolute;
    border: 1px solid rgb(219, 219, 219);
    cursor: text;
    z-index: 1;   
    &:empty{
        border:none;
    }
`;

export const SuggestionItem = styled.div`
    padding: 1px;
    &:hover {
        cursor: pointer;
        background-color: rgb(219, 219, 219);
        color: white;
    }
`;

export const IconBar = styled.div`
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