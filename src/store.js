import { configureStore } from "@reduxjs/toolkit";

import MainReducer from "./slices/MainSlice";

const store = configureStore({
  reducer: {
    main: MainReducer,
  },
});

export default store;
