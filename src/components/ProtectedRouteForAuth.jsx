import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRouteForAuth({ children }) {
  const { isAuth } = useSelector((state) => state.main);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);
  return !isAuth ? children : null;
}

export default ProtectedRouteForAuth;
