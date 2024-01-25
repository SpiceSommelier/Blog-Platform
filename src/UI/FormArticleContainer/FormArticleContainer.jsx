import classes from "./FormArticleContainer.module.css";

const FormArticleContainer = ({ children, title }) => {
  return (
    <div className={classes.formArticleContainer}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default FormArticleContainer;
