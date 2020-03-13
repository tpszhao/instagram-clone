import styled,{css} from 'styled-components'
import { Link } from "react-router-dom";

export const ModalContainer = styled.div`
    position:relative;
    width:750px;
    height:500px;
    max-height:80vh;
    max-width:80vw;
    display:flex;
    flex-direction:column;
    flex-wrap:nowrap;
    justify-content:space-around;
    align-items:center;
    border: 1px solid rgb(219,219,219);
    border-radius:5px;
    padding:30px;
`;

export const Form = styled.form`
    position:relative;
    width:300px;
    max-width:calc(100% - 96px);

    display:flex;
    justify-content:space-between;
    align-items:center;

    padding:0px 10px;
    border-radius:14px;
    border: 1px solid rgb(219, 219, 219);

    background-color:${props => props.backgroundColor||'white'};
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




export const Photo = styled.img`
    margin:10px;
    max-width:70%;
    max-height:70%;
    object-fit:scale-down;
`;

export const AddToCollection = styled.button`
    outline:none;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    color:rgb(150,150,150);
    border: 2px solid rgb(219,219,219);
    background-color:white;
    border-radius: 3px;
    &:hover{
        cursor: pointer;
        background-color:rgb(219,219,219,0.3);
    };
    &:active{
        cursor: pointer;
        background-color:rgb(219,219,219);
        color: white;
    };
`;

export const Card = styled.div`
    overflow: hidden;
    position: relative;
    text-align: center;
    margin: 10px auto;
    width: calc(296px * 0.9);
    height: 296px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @media only screen and (max-width: 976px) {
        width: calc((100vw - 32px) / 3);
        height: calc((100vw - 32px) / 3);
    }
`;

export const CardHeaderLink = styled(Link)`
    position:relative;
    align-self:flex-start;
    text-decoration:none;
    color:black;
    line-height:24px;
    cursor:pointer;

    ${props=>`
        color:${props.theme.textColor};
    `}
`;

export const cardCSS = css`
    cursor:pointer;
    position:relative;
    width: 90%;
    height: 80%;
`;


export const ToolBar = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0px 5%;
`;

export const HighlightMenuCard = styled.div`
    width: 296px;
    min-height: 60px;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    position: relative;
    margin-top: 16px;
    margin-bottom:16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 976px) {
        width: 100%;
        max-width:100vw;
    }

    ${props=>`
        background-color:${props.theme.backgroundColor};
        border: 1px solid ${props.theme.borderColor};
    `}
`;

export const HighlightHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    width: 100%;
    padding:0px 8px;
    ${props=>`
        border-bottom: 1px solid ${props.theme.borderColor};
    `}

`;

export const HighlightCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 976px) {
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
`;
