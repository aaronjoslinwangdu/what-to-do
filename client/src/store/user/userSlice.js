import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userToDelete: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserToDelete: (state, action) => {
      state.userToDelete = action.payload;
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice;