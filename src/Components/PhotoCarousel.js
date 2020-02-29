import React,{useState,useRef,useEffect} from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  ${props=>props.containerCSS};
`;

const Item = styled.div`
  ${props=>`
    height:${props.height}px;
    width:${props.width}px
  `}
  display:flex !important;
  justify-content:center;
  align-items:center;
`;

const Photo = styled.img`
  width:100%;
  height:100%;
  max-width:100%;
  max-height:100%;
  object-fit:${props=>props.scaleDown||"cover"};
`;


var defaultSetting = {
  autoplaySpeed:4000,
  arrows:false,
  vertical:false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};


export default function PhotoCarousel({
  containerCSS,
  scaleDown=false,
  autoplay=false,
  photolist}) {
    const [itemSize, setItemSize] = useState({width:0,height:0});
    const container = useRef(null);

    useEffect(() => {
      const changeItemSize = ()=>{
        const {clientWidth:width,clientHeight:height} = container.current;
        setItemSize({width,height});
      }
      window.addEventListener('resize', changeItemSize);
      changeItemSize();
      return ()=> window.removeEventListener('resize', changeItemSize);
    },[])

    return (
        <Container ref={container} containerCSS={containerCSS}>
            <Slider {...defaultSetting} autoplay={autoplay}>
              {photolist.map(photo=>{
                return (
                <Item key={photo.id} {...itemSize}>
                  <Photo 
                    scaleDown={scaleDown}
                    src={photo.urls.regular} 
                    alt="placeholder"/>
                </Item>
                )
              })}
            </Slider>
        </Container>
    )
}
