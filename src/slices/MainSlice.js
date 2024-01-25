import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

//const navigate = useNavigate()

const requestOnCreateAccount = createAsyncThunk(
  "main/requestOnCreateAccount",
  async ({ accountData }, { getState }) => {
    const { main, errors } = getState();
    const response = await fetch(`${main.URL}/Users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          ...accountData,
        },
      }),
    });
    const data = await response.json();
    return data;
  },
);
const createArticle = createAsyncThunk(
  "main/createArticle",
  async (article, { getState }) => {
    const { main } = getState();
    const response = await fetch(`${main.URL}/articles`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article: { ...article } }),
    });
    const data = await response.json();
    message.open({
      type: "success",
      content:
        "Your post has been created! You have been redirected to your post page.",
      duration: 5,
    });
    return data;
  },
);
const followArticle = createAsyncThunk(
  "main/followArticle",
  async (slug, { getState }) => {
    const { main } = getState();
    const response = await fetch(
      `${main.URL}/articles/${main.currentArticle}/favorite`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      },
    );
    const data = await response.json();

    return data;
  },
);
const unFollowArticle = createAsyncThunk(
  "main/unFollowArticle",
  async (slug, { getState }) => {
    const { main } = getState();
    const response = await fetch(
      `${main.URL}/articles/${main.currentArticle}/favorite`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      },
    );
    const data = await response.json();

    return data;
  },
);
const autoAuth = createAsyncThunk("main/autoAuth", async (_, { getState }) => {
  const { main } = getState();
  const getAuthData = await fetch(`${main.URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  const AuthSecureData = await getAuthData.json();

  return AuthSecureData;
});

const auth = createAsyncThunk("main/auth", async (loginData, { getState }) => {
  const { main } = getState();
  const requestUserData = await fetch(`${main.URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: { email: loginData.email, password: loginData.password },
    }),
  });
  const userData = await requestUserData.json();
  return userData;
});
const getArticles = createAsyncThunk(
  "main/getArticles",
  async (_, { getState }) => {
    const { main } = getState();
    try {
      const response = await fetch(
        `${main.URL}/articles?&limit=5&offset=${
          main.articlesIndex !== 0 ? main.articlesIndex * 5 + 1 : 0
        }`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);
const getArticle = createAsyncThunk(
  "main/getArticle",
  async (slug, { getState }) => {
    const { main } = getState();
    try {
      const response = await fetch(
        `${main.URL}/articles/${slug ? slug : main.currentArticle}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);
const updateArticle = createAsyncThunk(
  "main/updateArticle",
  async (dataForUpdate, { getState }) => {
    const { main } = getState();
    try {
      const response = await fetch(
        `${main.URL}/articles/${main.currentArticle}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            article: { ...dataForUpdate },
          }),
        },
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);
const deleteArticle = createAsyncThunk(
  "main/deleteArticle",
  async (slug, { getState }) => {
    const { main } = getState();
    const response = await fetch(
      `${main.URL}/articles/${main.currentArticle}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      },
    );
    const data = await response.json();

    return data;
  },
);
const updateUser = createAsyncThunk(
  "main/updateUser",
  async (newUserData, { getState }) => {
    const { main } = getState();
    const requestUserData = await fetch(`${main.URL}/user`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { ...newUserData },
      }),
    });
    const userData = await requestUserData.json();
    return userData;
  },
);
const initialState = {
  isDataRequested: false,
  URL: "https://blog.kata.academy/api",
  error: null,
  setError: null,
  user: {},
  userData: {},
  isAuth: false,
  articlesIndex: 0,
  articles: [],
  article: null,
  currentArticle: null,
  paginationCount: null,
  isFollowProcess: false,
};

const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setArticlesIndex(store, action) {
      store.articlesIndex = action.payload - 1;
      localStorage.setItem("articlesIndex", store.articlesIndex);
    },
    logOut(store) {
      store.isAuth = false;
      store.userData = {};
      store.token = "";
      localStorage.removeItem("token");
    },
    setErrorFunction(store, action) {
      store.setError = action.payload;
    },
    setCurrentArticle(store, action) {
      store.currentArticle = action.payload;
    },
    setAuth(store) {
      store.isAuth = !store.isAuth;
    },
    autoSetArticlesIndex(store) {
      if (!localStorage.getItem("articlesIndex")) {
        localStorage.setItem("articlesIndex", "0");
      } else {
        store.articlesIndex = Number(localStorage.getItem("articlesIndex"));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOnCreateAccount.pending, (state) => {
        state.error = null;
        state.isDataRequested = true;
      })
      .addCase(requestOnCreateAccount.fulfilled, (state, action) => {
        if ("errors" in action.payload) {
          message.open({
            type: "error",
            content:
              "There was an error when updating the account. Please check the form and correct any errors in the form.",
            duration: 5,
          });
          for (const [key, value] of Object.entries(action.payload.errors)) {
            state.setError(key, { type: "server", message: `${key} ${value}` });
          }
          state.isDataRequested = false;
          return;
        }
        state.isDataRequested = false;
        state.token = action.payload.user.token;
        localStorage.setItem("token", state.token);
        message.open({
          type: "success",
          content: "Account successfully created!",
          duration: 3,
        });
      })
      .addCase(requestOnCreateAccount.rejected, (state) => {
        state.isDataRequested = false;
      })
      .addCase(autoAuth.fulfilled, (state, action) => {
        if (!localStorage.getItem("articlesIndex")) {
          localStorage.setItem("articlesIndex", "0");
        } else {
          state.articlesIndex = Number(localStorage.getItem("articlesIndex"));
        }
        if (!action?.payload?.user?.token) {
          state.isAuth = false;
          return;
        }

        state.isDataRequested = false;
        state.userData = action.payload.user;
        state.isAuth = true;
        message.open({
          type: "success",
          content: "You are successfully authorized!",
          duration: 3,
        });
        //navigate("/")
      })
      .addCase(auth.pending, (state) => {
        state.isDataRequested = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        localStorage.removeItem("token");
        if (!action.payload?.user?.token) {
          message.open({
            type: "error",
            content: "Failed to authorize. Check your login and password.",
            duration: 5,
          });
          state.isDataRequested = false;
          return;
        }
        localStorage.setItem("token", action.payload.user.token);
        message.open({
          type: "success",
          content: "Articles are successfully uploaded!",
          duration: 3,
        });
        state.userData = action.payload.user;
        state.isDataRequested = false;
        state.isAuth = true;
      })
      .addCase(getArticles.pending, (state, action) => {
        state.isDataRequested = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.paginationCount = action.payload.articlesCount / 5;
        state.articles = action.payload.articles;
        state.isDataRequested = false;
      })
      .addCase(getArticle.pending, (state, action) => {
        state.isDataRequested = true;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.currentArticle = action.payload.article.slug;
        state.isDataRequested = false;
      })
      .addCase(followArticle.pending, (state, action) => {
        state.isFollowProcess = true;
      })
      .addCase(followArticle.fulfilled, (state, action) => {
        state.article = { ...action.payload.article };
        state.isFollowProcess = false;
      })
      .addCase(unFollowArticle.pending, (state, action) => {
        state.isFollowProcess = true;
      })
      .addCase(unFollowArticle.fulfilled, (state, action) => {
        state.article = { ...action.payload.article };
        state.isFollowProcess = false;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isFollowProcess = true;
        state.articlesIndex = 0;
        localStorage.setItem("articlesIndex", 0);
      })
      .addCase(updateUser.pending, (state) => {
        state.isDataRequested = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isDataRequested = false;
        if ("errors" in action.payload) {
          message.open({
            type: "error",
            content:
              "There was an error when updating the account. Please check the form and correct any errors in the form.",
            duration: 5,
          });
          for (const [key, value] of Object.entries(action.payload.errors)) {
            state.setError(key, { type: "server", message: `${key} ${value}` });
          }
          return;
        }
        state.userData = { ...action.payload.user };
        message.open({
          type: "success",
          content: "Account details have been successfully updated.",
          duration: 5,
        });
      });
  },
});

export default MainSlice.reducer;
export const {
  setAuth,
  setCurrentArticle,
  setArticlesIndex,
  logOut,
  setErrorFunction,
  autoSetArticlesIndex,
} = MainSlice.actions;
export {
  requestOnCreateAccount,
  autoAuth,
  auth,
  getArticles,
  updateUser,
  getArticle,
  followArticle,
  unFollowArticle,
  createArticle,
  deleteArticle,
  updateArticle,
};
