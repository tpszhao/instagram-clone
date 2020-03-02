import styled from 'styled-components';
export const Container = styled.div`
    width: 100%;
    height: 256px;
    display: grid;
    grid-template-columns:300px auto;
    grid-template-rows: 60px 50px 40px auto;
    @media only screen and (max-width: 720px){
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
`;

export const Image = styled.div`
    width: 150px;
    height:150px;
    grid-column: 1/2;
    grid-row: 1/5;
    border-radius: 50%;
    justify-self: center;
    align-self: center;
    background-image:url("${props=>props.src}");
    background-size:cover;
    background-color:white;
`;

export const Title = styled.span`
    align-self: center;
    font-size: x-large;
    grid-column: 2/3;
    grid-row: 2/3;
`;

export const Stats = styled.div`
    max-width: 368px;
    font-size: large;
    grid-column: 2/3;
    grid-row: 3/4;
    display: flex;
    align-content: center;
    justify-content: space-between;
    @media only screen and (max-width: 720px){
        justify-content:space-around;
        width:100%;
        max-width:100%;
        text-align: center;
    }
`;
