import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Spinner from "../UI/Spinner/Spinner";
import FormArticle from "../modules/FormArticle";
import { getArticle, setCurrentArticle } from "../slices/MainSlice";

const Edit = () => {
  const dispatch = useDispatch();
  const { isDataRequested, article, currentArticle } = useSelector(
    (state) => state.main,
  );
  const location = useLocation();
  console.log(article);

  useEffect(() => {
    if (currentArticle) return;
    dispatch(getArticle(location.pathname.split("/").at(-2)));
  }, [currentArticle]);
  return <> {currentArticle ? <FormArticle data={article} /> : <Spinner />}</>;
};

export default Edit;
