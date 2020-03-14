import styled from 'styled-components';


export const Container = styled.div`
    cursor: pointer;
    margin:5px;
    width:calc(100% - 10px);
    height:${props=>props.height};

    overflow: hidden;
    position: relative;
    line-height:0px;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const Overlay = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    font-size: large;
    position: absolute;
    top: 0px;
    background-color: grey;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    text-align: center;
    transition: 0.5s;
    &:hover{
        opacity: 0.8;
    }
`;