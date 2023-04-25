import { configureStore } from "@reduxjs/toolkit";

import layoutSlice from "./layout/layoutSlice";
import itemSlice from "./items/itemSlice";
import authSlice from "./auth/authSlice";

const store = configureStore({
  reducer: {
    layout: layoutSlice.reducer,
    item: itemSlice.reducer,
    auth: authSlice.reducer,
  }
});

export default store;