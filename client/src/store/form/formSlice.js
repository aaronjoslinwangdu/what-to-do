import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addItemStatus: 0,
}

export const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    setAddItemStatus: (state, action) => {
      state.addItemStatus = action.payload;
    },
  }
});

export const formActions = formSlice.actions;

export default formSlice;