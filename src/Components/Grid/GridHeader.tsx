import React from "react";
import { Container, Image, Title, Stats } from "./GridHeader.styles";

interface Props {
  src: string;
  title: string;
  statList: string[];
}

export default function GridHeader({ src, title, statList = [] }: Props) {
  return (
    <Container>
      <Image src={src} alt="" />
      <Title>{title}</Title>
      <Stats>
        {statList.map((stat, i) => (
          <span key={i}>{stat}</span>
        ))}
      </Stats>
    </Container>
  );
}
