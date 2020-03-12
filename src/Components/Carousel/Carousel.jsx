import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { Container, Item } from "./Carousel.styles";

var defaultSetting = {
  autoplaySpeed: 1000,
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
  onClick = () => {},
  reference = null,
  vertical = false,
  autoplay = false,
  counter,
  children,
  ...rest
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
    if (reference) {
      reference.current = slider.current;
    }
    return () => window.removeEventListener("resize", changeItemSize);
  }, []);

  useEffect(() => {
    counter&&slider.current.slickNext();
  }, [counter]);

  return (
    <Container ref={container} containerCSS={containerCSS} onClick={onClick}>
      <Slider
        {...defaultSetting}
        ref={slider}
        autoplay={autoplay}
        vertical={vertical}
        {...rest}>
        {children.map((child, i) => {
          return (
            <Item key={i} {...itemSize}>
              {child}
            </Item>
          );
        })}
      </Slider>
    </Container>
  );
}
