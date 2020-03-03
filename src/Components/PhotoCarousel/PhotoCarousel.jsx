import React, { useState, useRef, useEffect } from "react";
import {css} from 'styled-components';
import Slider from "react-slick";
import { Container, Item } from "Styles/PhotoCarousel";
import {ImageLazyLoader} from 'Components'

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

const imageContainerCSS=css`
  width: 100%;
  height: 100%;
`;

export default function PhotoCarousel({
  containerCSS,
  objectFit = 'cover',
  autoplay = false,
  isPlaying = false,
  photoList
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
        {photoList.map(photo => {
          return (
            <Item key={photo.id} {...itemSize}>
              <ImageLazyLoader 
                src={photo.urls.regular}
                placeholderColor={photo.color}
                imageContainerCSS={imageContainerCSS}/>
            </Item>
          );
        })}
      </Slider>
    </Container>
  );
}
