import React, { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { LatestPhotos, HighlightsMenu, CustomModal } from "Components";

const Container = styled.div`
  margin: auto;
  display: flex;
  position: relative;
  justify-content: center;
  @media only screen and (max-width: 976px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;
const SideBar = styled.div<{stickyPos:number;}>`
  margin: 10px 16px;
  width: 296px;
  height: 100%;
  position: sticky;
  top: ${props => `${props.stickyPos ? 90 - props.stickyPos : 90}px`};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 976px) {
    position: relative;
    width: 616px;
    top: 0px;
    margin: 0px;
    max-width: calc(100vw - 32px);
  }
`;

export default function HomePage({ match: { path } }:RouteComponentProps) {
  const [stickyPos, setStickyPos] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalScreen, setModalScreen] = useState<any>(null);
  return (
    <>
      <Container>
        <LatestPhotos
          route={path}
          setModalIsOpen={setModalIsOpen}
          setModalScreen={setModalScreen}
        />
        <SideBar stickyPos={stickyPos}>
          <HighlightsMenu
            setStickyPos={setStickyPos}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            setModalScreen={setModalScreen}
          />
        </SideBar>
      </Container>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {modalScreen}
      </CustomModal>
    </>
  );
}
