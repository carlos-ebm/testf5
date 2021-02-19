import React from "react";
import { Modal as ModalAntd } from "antd";

import "./Modal.scss";

export default function Modal(props) {
  const { children, title, isVisible, setIsVisible, ...other } = props;

  return (
    <ModalAntd
      title={title}
      centered
      visible={isVisible}
      onCancel={() => setIsVisible(false)}// para actualizar el editor en editpublicationform {() => setIsVisible(false), window.location.reload()}
      footer={false}
      {...other}
    >
      {children}
    </ModalAntd>
  );
}
