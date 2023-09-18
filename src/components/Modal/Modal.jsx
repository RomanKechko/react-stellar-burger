import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "../Modal-Overlay/Modal-Overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Modal({ onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  });

  return ReactDOM.createPortal(
    <>
      <article className={styles.modal}>
        <button className={styles.modal__cross} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        <div className={styles.container__modal_center}>{children}</div>
      </article>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("react-modals")
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.object,
};
export default Modal;
