import { configureStore } from "@reduxjs/toolkit";

import layoutSlice from "./layout/layoutSlice";
import itemSlice from "./items/itemSlice";

const store = configureStore({
  reducer: {
    layout: layoutSlice.reducer,
    item: itemSlice.reducer,
  }
});

export default store;