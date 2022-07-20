import styles from "./FormModal.module.css";
import Selector from "./Selector";
import SignUpForm from "./SignUpForm";

function FormModal(props) {
  return (
    <>
      <div className={styles.formModal}>
        <h1>Login Form</h1>
        <Selector />
        <SignUpForm />
      </div>
      <div onClick={props.handleClick} className={styles.lightBox}></div>
    </>
  );
}

export default FormModal;
