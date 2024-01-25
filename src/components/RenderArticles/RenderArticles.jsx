import { ConfigProvider, Pagination } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RenderArticle from "../../UI/RenderArticle/RenderArticle";
import Spinner from "../../UI/Spinner/Spinner";
import { getArticles, setArticlesIndex } from "../../slices/MainSlice";

const RenderArticles = () => {
  const {
    articlesIndex,
    articles,
    paginationCount,
    userData,
    isDataRequested,
  } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticles());
  }, [articlesIndex]);
  function onChangePaginationCount(newValue) {
    dispatch(setArticlesIndex(newValue));
  }
  return (
    <div
      style={{
        width: "940px",
        margin: "26px auto",
        display: "flex",
        flexDirection: "column",
        gap: "26px",
        cursor: "pointer",
      }}
    >
      {isDataRequested ? (
        <Spinner />
      ) : (
        articles.map((el, index) => <RenderArticle key={index} article={el} />)
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#1890FF",
                colorPrimary: "#FFF",
                colorPrimaryHover: "#FFF",
              },
            },
          }}
        >
          <Pagination
            total={paginationCount * 10}
            current={articlesIndex + 1}
            showSizeChanger={false}
            centered={true}
            onChange={onChangePaginationCount}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default RenderArticles;
