import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logout: state => {
      state.user = null;
      state.accessToken = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;