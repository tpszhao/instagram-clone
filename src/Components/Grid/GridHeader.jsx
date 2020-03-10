import React from 'react';
import {Container,Image,Title,Stats} from './GridHeader.styles'

export default function GridHeader({src,title,statList=[]}) {    
    return (
    <Container>
        <Image src={src} alt="avatar"/>
        <Title>{title}</Title>
        <Stats>
        {statList.map((stat,i)=><span key={i}>{stat}</span>)}
        </Stats>
    </Container>
    )
}

