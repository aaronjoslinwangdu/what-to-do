import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  accessToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { email, accessToken } = action.payload;
      state.email = email;
      state.accessToken = accessToken;
    },
    logout: state => {
      state.email = null;
      state.accessToken = null;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;