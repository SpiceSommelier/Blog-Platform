import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import FormArticleContainer from "../UI/FormArticleContainer/FormArticleContainer";
import Spinner from "../UI/Spinner/Spinner";
import SpinnerFullPage from "../UI/SpinnerFullPage/SpinnerFullPage";
import ArticleItem from "../components/ArticleItem/ArticleItem";
import { getArticle, setCurrentArticle } from "../slices/MainSlice";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { isDataRequested, article, currentArticle } = useSelector(
    (state) => state.main,
  );

  const location = useLocation();
  useEffect(() => {
    if (currentArticle !== location.pathname.split("/").at(-1)) {
      dispatch(setCurrentArticle(location.pathname.split("/").at(-1)));
      dispatch(getArticle(location.pathname.split("/").at(-1)));
    }
  }, [article]);
  return <>{isDataRequested ? <Spinner /> : <ArticleItem data={article} />}</>;
};

export default ArticlePage;
