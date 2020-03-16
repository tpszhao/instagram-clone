import React,{useState, useEffect} from 'react';
import styled from 'styled-components';


const defaultBreakPoint={
    600:1,
    800:2,
    936:3,
}

const Container = styled.div`
    background-color:green;
    width:100%;
    display:flex;
    justify-content:center;
`;

const ColumnContainer = styled.div`
    width:${props=>props.width};
    display:flex;
    flex-direction:column;
`;


export default function MasonryContainer({
    defaultColumnCount = 3,
    breakPoint=defaultBreakPoint,
    children=[]
}) {
    const [columnCount, setColumnCount] = useState(defaultColumnCount);
    const [columnItems, setColumnItems] = useState([]); 

    useEffect(() => {
        window.addEventListener("resize", calculateColumnCount);
        calculateColumnCount();
        return () => {
            window.removeEventListener("resize", calculateColumnCount);
        }
    }, [])

    useEffect(() => {
        recalculateColumnItems();
    }, [columnCount,children])

    const calculateColumnCount = ()=>{
        const {innerWidth:width} = window;
        for(const key in breakPoint){
            if(width < key){
                setColumnCount(breakPoint[key]);
                return;
            }
        }
        setColumnCount(defaultColumnCount);
    }

    const recalculateColumnItems = ()=>{
        let columnWidth = `${100/columnCount}%`;
        let columnArray = new Array(columnCount).fill([]);
        for(let i = 0; i<children.length;i++){
            const columnIndex = i % columnCount;
            const newColumn = [...columnArray[columnIndex],children[i]];
            columnArray[columnIndex] = newColumn;
        }
        let newColumnItems = [];

        for(let i = 0;i<columnCount;i++){
            newColumnItems[i]=(
                <ColumnContainer key={i} width={columnWidth}>
                    {columnArray[i]}
                </ColumnContainer>)
        }

        setColumnItems(newColumnItems);
    }

    
    
    return (
        <Container>
            {columnItems}
        </Container>
    )
}
