import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { Container, Item } from "Styles/Carousel";

var defaultSetting = {
  autoplaySpeed: 4000,
  arrows: false,
  vertical: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function Carousel({
  containerCSS,
  reference=null,
  autoplay = false,
  isPlaying = false,
  children
}) {
  const [itemSize, setItemSize] = useState({ width: 0, height: 0 });
  const container = useRef(null);
  const slider = useRef(null);
  useEffect(() => {
    const changeItemSize = () => {
      const { clientWidth: width, clientHeight: height } = container.current;
      setItemSize({ width, height });
    };
    window.addEventListener("resize", changeItemSize);
    changeItemSize();
    if(reference) reference.current=slider;
    return () => window.removeEventListener("resize", changeItemSize);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      slider.current.slickPlay();
    } else {
      slider.current.slickPause();
    }
  }, [isPlaying]);

  return (
    <Container ref={container} containerCSS={containerCSS}>
      <Slider {...defaultSetting} ref={slider} autoplay={autoplay}>
        {children.map((child,i)=>{
          return <Item key={i} {...itemSize}>{child}</Item>})}
      </Slider>
    </Container>
  );
}
