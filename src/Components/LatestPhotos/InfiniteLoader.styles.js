import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardContainer = styled.div`
    position:relative;
    width: 100%;
    max-width:100vw;
    margin: 10px;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 976px) {
        margin:5px 0px;
        width: 100%;
        max-width:100vw;
    }
`;

export const UserInfo = styled(Link)`
    display: flex;
    align-items: center;
    align-self:flex-start;
    height: 60px;
    text-decoration: none;
`;

export const ProfileImage = styled.img`
    margin: 8px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

export const UserName = styled.span`
    text-decoration: none;
    color: black;
`;

export const PhotoStat = styled.div`
    display: flex;
    width: 100%;
    padding: 8px;
`;

export const InfiniteContainer = styled.div`
    margin: 16px;
    width: 616px;
    max-width: calc(100vw - 32px);
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    @media only screen and (max-width: 976px) {
        margin:0px;
    }
`;
