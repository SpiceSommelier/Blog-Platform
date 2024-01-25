import classes from "./FormContainer.module.css";

const FormContainer = ({ children, title }) => {
  return (
    <div className={classes.formContainer}>
      <p className={classes.formTitle}>{title}</p>
      {children}
    </div>
  );
};

export default FormContainer;
