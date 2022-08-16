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
          <LoginForm
            handleData={props.handleData}
            handleClick={props.handleClick}
            isLoggedIn={props.isLoggedIn}
            handleAccountClick={props.handleAccountClick}
          />
        )}
        {modalFormContent === "signup" && (
          <SignUpForm
            handleData={props.handleData}
            handleClick={props.handleClick}
            isLoggedIn={props.isLoggedIn}
            handleAccountClick={props.handleAccountClick}
          />
        )}
      </div>
      <div onClick={props.handleClick} className={styles.lightBox}></div>
    </>
  );
}

export default FormModal;
