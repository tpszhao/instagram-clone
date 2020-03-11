import React from "react";
import Modal from "react-modal";

const modalStyle = {
    overlay: {
        zIndex: 50,
        backgroundColor: "rgb(219, 219, 219,0.7)"
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        border: "none",
        padding: "none",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgb(219, 219, 219,0.7)"
    }
};
Modal.setAppElement("#root");

export default function CustomModal({children,...rest}) {
    return (
    <Modal
        {...rest}
        style={modalStyle}>
        {children}
    </Modal>);
}
