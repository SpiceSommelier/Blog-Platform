import { Popconfirm, message } from "antd";
import { format } from "date-fns";
import React from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ArticleContainer from "../../UI/ArticleContainer/ArticleContainer";
import Like from "../../UI/Like";
import {
  deleteArticle,
  followArticle,
  unFollowArticle,
} from "../../slices/MainSlice";
import classes from "./ArticleItem.module.css";

const ArticleItem = ({ data }) => {
  const { isFollowProcess } = useSelector((state) => state.main);
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.main.userData);
  const dispatch = useDispatch();
  function onFollow() {
    if (data.favorited) dispatch(unFollowArticle());
    if (!data.favorited) dispatch(followArticle());
  }
  return (
    <ArticleContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={classes.articlePostInfoContainer}>
          <div className={classes.titleContainer}>
            <p className={classes.articleItem}>
              {data?.title ? data.title : "Loading"}
            </p>
            <div
              onClick={() => {
                if (isFollowProcess) return;
                onFollow();
              }}
              className={`${classes.favoritesContainer} ${
                data?.favorited ? "active" : ""
              } ${isFollowProcess ? "disabled" : ""}`}
            >
              <Like isSelected={data?.favorited} />
              <p>
                {typeof data?.favoritesCount === "number"
                  ? data.favoritesCount
                  : "Loading"}
              </p>
            </div>
          </div>
          <div className={classes.tags}></div>
          <div className={classes.tagsContainer}>
            {Array.isArray(data?.tagList)
              ? data.tagList.map((el, i) => <span key={i}>{el}</span>)
              : "loading"}
          </div>
          <p className={classes.descriptionContainer}>{data?.description}</p>
        </div>
        <div>
          <div className={classes.authorInfoContainer}>
            <div className={classes.nameAndDateContainer}>
              <p>
                {data?.author?.username ? data?.author?.username : "loading"}
              </p>
              <p>
                {data?.createdAt
                  ? format(new Date(data?.createdAt), "MMMM d, yyyy")
                  : "Loading date"}
              </p>
              {username === data?.author?.username ? (
                <div className={classes.controlTask}>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={async () => {
                      try {
                        await dispatch(deleteArticle());
                        navigate("/articles/");
                        message.open({
                          type: "success",
                          content: "Article it was successfully deleted",
                          duration: 5,
                        });
                      } catch (error) {
                        message.open({
                          type: "error",
                          content: error,
                          duration: 5,
                        });
                      }
                    }}
                    okText="Yes"
                    cancelText="No"
                    placement="right"
                  >
                    <button className={classes.deleteArticle}>Delete</button>
                  </Popconfirm>
                  <button
                    className={classes.editArticle}
                    onClick={() => navigate("./edit")}
                  >
                    Edit
                  </button>
                </div>
              ) : null}
            </div>
            <div className={classes.imgContainer}>
              <img
                src={data?.author?.image ? data.author.image : ""}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png";
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "24px",
          overflow: "hidden",
          wordBreak: "break-word",
        }}
      >
        {data?.body ? <Markdown>{data.body}</Markdown> : "Loading..."}
      </div>
    </ArticleContainer>
  );
};

export default ArticleItem;
