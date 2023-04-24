import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isAuthenticated: false
  },
  reducers: {
    login: (state, action) => {
      console.log('hello :D');
    }
  }
});

export const sessionActions = sessionSlice.actions;

export default sessionSlice;