import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
function Modal({ children, setActive, onClick }) {
  function onClose() {
    setActive(false);
  }

  useEffect(() => {
    const handleEsc = (e) => {
      e.key === "Escape" && onClose();
    };
    const handleEs = (e) => {
      e.key === "Escape" && onClick();
    };
    document.addEventListener("keydown", handleEsc);

    document.addEventListener("keydown", handleEs);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", handleEs);
    };
  });

  return ReactDOM.createPortal(
    <>
      <article className={styles.modal}>
        <button className={styles.modal__cross} onClick={(onClose, onClick)}>
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
  children: PropTypes.object,
};
export default Modal;
