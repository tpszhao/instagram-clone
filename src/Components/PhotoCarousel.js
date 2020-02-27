import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
    height:120px;
    width:100%;
    background-color:teal;
`;

const Item = styled.div`
    margin:auto;
    height:50px;
    background-color:red;
    width:100%;
    text-align:center;
`;


var settings = {
    vertical:true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};


export default function PhotoCarousel() {
    return (
        <Container>
            <Slider {...settings}>
                <Item>stuff</Item>
                <Item>stuff</Item>
                <Item>stuff</Item>
            </Slider>
        </Container>
    )
}
