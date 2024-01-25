import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { autoAuth, logOut } from "../../slices/MainSlice";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.main);
  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    dispatch(autoAuth());
  }, []);
  const { image, username } = useSelector((stat) => stat.main.userData);
  return (
    <div className={styles.header}>
      <h2>
        <Link to={"/"}>Realworld Blog</Link>
      </h2>
      {isAuth ? (
        <div className={styles.profileContainer}>
          <NavLink to={"/new-article"} className={styles.createArticle}>
            Create article
          </NavLink>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <p>{username ? username : "Username"}</p>
            <NavLink to={"/profile"} className={styles.imgContainer}>
              <img
                src={image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png";
                }}
              />
            </NavLink>
          </div>
          <Link
            to={"/sign-in"}
            className={styles.logOut}
            onClick={() => dispatch(logOut())}
          >
            Log Out
          </Link>
        </div>
      ) : (
        <div className={styles.notAuth}>
          <NavLink to={"/sign-in"} className={styles.signIn}>
            Sign In
          </NavLink>
          <NavLink to={"/sign-up"} className={styles.signUp}>
            Sign Up
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
