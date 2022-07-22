import { useState } from "react";
import styles from "./FormModal.module.css";
import LoginForm from "./LoginForm";
import Selector from "./Selector";
import SignUpForm from "./SignUpForm";

function FormModal(props) {
  const [modalFormContent, setModalFormContent] = useState("login");

  function handleSelect(e) {
    setModalFormContent(e.target.id);
  }

  return (
    <>
      <div className={styles.formModal}>
        {modalFormContent === "login" && <h1>Login Form</h1>}
        {modalFormContent === "signup" && <h1>SignUp Form</h1>}
        <Selector handleSelect={handleSelect} />
        {modalFormContent === "login" && (
          <LoginForm isLoggedIn={props.isLoggedIn} />
        )}
        {modalFormContent === "signup" && (
          <SignUpForm isLoggedIn={props.isLoggedIn} />
        )}
      </div>
      <div onClick={props.handleClick} className={styles.lightBox}></div>
    </>
  );
}

export default FormModal;
