import { configureStore } from "@reduxjs/toolkit";

import layoutSlice from "./layout/layoutSlice";
import itemSlice from "./items/itemSlice";
import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
import { apiSlice } from "./api/apiSlice"
import formSlice from "./form/formSlice";

const store = configureStore({
  reducer: {
    layout: layoutSlice.reducer,
    item: itemSlice.reducer,
    auth: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice.reducer,
    form: formSlice.reducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store;