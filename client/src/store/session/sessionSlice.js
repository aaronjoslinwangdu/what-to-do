import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.token = null;
    }
  }
});

export const sessionActions = sessionSlice.actions;

export default sessionSlice;