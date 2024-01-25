import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuth } = useSelector((state) => state.main);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/sign-in");
  }, [isAuth, navigate]);
  return isAuth ? children : null;
}

export default ProtectedRoute;
