import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import RenderArticles from "../components/RenderArticles/RenderArticles";

const Articles = () => {
  return (
    <div>
      <RenderArticles />
    </div>
  );
};

export default Articles;
