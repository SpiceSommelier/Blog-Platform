import { format } from "date-fns";
import { NavLink, useNavigate } from "react-router-dom";

import Like from "../Like";
import classes from "./RenderArticle.module.css";

const RenderArticle = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div
      className={classes.articleContainer}
      onClick={() => navigate(`/articles/${article.slug}`)}
    >
      <div
        style={{
          flex: "0 0 682px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <p style={{ overflow: "hidden" }}>
            <NavLink to={"/"}>{article?.title}</NavLink>
          </p>
          <p className={classes.favotiteContainer}>
            <Like />
            <span>{article.favoritesCount}</span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            overflow: "hidden",
          }}
        >
          {article?.tagList.map((tag, index) => {
            if (tag === "") return;
            return (
              <div key={index} className={classes.tagContainer}>
                {tag}
              </div>
            );
          })}
        </div>
        <p>{article?.description}</p>
      </div>
      <div className={classes.authorContainer}>
        <div>
          <p className={classes.author}>
            {article?.author?.username ? article.author.username : "Username"}
          </p>
          <p className={classes.createdDate}>
            {format(new Date(article?.createdAt), "MMMM d, uuuu")}
          </p>
        </div>
        <div className={classes.imgContainer}>
          <img
            src={article.author.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png";
            }}
            alt={article.username ? article.username : "Username"}
          />
        </div>
      </div>
    </div>
  );
};

export default RenderArticle;
