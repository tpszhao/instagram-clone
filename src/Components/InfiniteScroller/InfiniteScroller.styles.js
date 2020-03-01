import styled from "styled-components";
import { Link } from "react-router-dom";
import Image from "react-graceful-image";

export const CardContainer = styled.div`
    width: 100%;
    margin: 10px;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const UserInfo = styled(Link)`
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    text-decoration: none;
`;

export const ProfileImage = styled(Image)`
    margin: 5px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

export const UserName = styled.span`
    text-decoration: none;
    color: black;
`;

export const Photo = styled(Image)`
    width: 100%;
    max-height: 700px;
    object-fit: cover;
`;

export const PhotoStat = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    padding-left: 30px;
`;

export const InfiniteContainer = styled.div`
    margin: 16px;
    width: 616px;
    max-width: calc(100vw - 32px);
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
`;