import { useDispatch } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteForAuth from "./components/ProtectedRouteForAuth";
import ArticlePage from "./pages/ArticlePage";
import Articles from "./pages/Articles";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import NewArticle from "./pages/NewArticle";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import {
  autoSetArticlesIndex,
  setArticlesIndex,
  setAuth,
} from "./slices/MainSlice";
import "./styles/styles.css";

function App() {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) dispatch(setAuth());
  dispatch(autoSetArticlesIndex());
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Articles />} />
          <Route
            path="/sign-in"
            element={
              <ProtectedRouteForAuth>
                <Login />
              </ProtectedRouteForAuth>
            }
          />
          <Route
            path="/sign-up"
            element={
              <ProtectedRouteForAuth>
                <Register />
              </ProtectedRouteForAuth>
            }
          />
          <Route path="/articles" element={<Articles />} />
          <Route
            path="/articles/:slug"
            element={
              <ProtectedRoute>
                <ArticlePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/new-article"
            element={
              <ProtectedRoute>
                <NewArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
