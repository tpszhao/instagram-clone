import React from 'react'
import styled from 'styled-components';
const Card = styled.div`
    width: 296px;
    height: 224px;
    border: 1px solid rgb(219,219,219);
    border-radius: 3px;
    position: sticky;
    top: 78px;
    @media only screen and (max-width: 976px){
        width:100%;
    }

`;

export default function Favourites() {
    return (
        <Card>
            
        </Card>
    )
}
