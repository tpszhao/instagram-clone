import React, { useContext } from "react";
import Modal from "react-modal";
import { ThemeContext } from "styled-components";

const modalStyle = {
  overlay: {
    zIndex: 50
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "none",
    padding: "none",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement("#root");

export default function CustomModal({ children, ...rest }) {
  const themeContext = useContext(ThemeContext);
  const { modalBackgroundColor: backgroundColor } = themeContext;
  const { overlay, content } = modalStyle;
  const style = {
    content: { ...content, backgroundColor },
    overlay: { ...overlay, backgroundColor }
  };
  return (
    <Modal {...rest} style={style}>
      {children}
    </Modal>
  );
}
