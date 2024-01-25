import classes from "./ArticleContainer.module.css";

const ArticleContainer = ({ children }) => {
  return <div className={classes.articleContainer}>{children}</div>;
};

export default ArticleContainer;
