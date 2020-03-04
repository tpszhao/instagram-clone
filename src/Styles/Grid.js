import styled from 'styled-components'

export const GridCell = styled.div`
    width: calc((100vw - 16px)/3);
    max-width: calc((936px - 16px)/3);
    height: calc((100vw - 16px)/3);
    max-height: calc((936px - 16px)/3);
    overflow: hidden;
    position: relative;
`;

export const GridCellOverlay = styled.div`
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
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const GridContainer = styled.div`
    margin: auto;
    margin-bottom: 20px;
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, auto);
    max-width:100%
`;