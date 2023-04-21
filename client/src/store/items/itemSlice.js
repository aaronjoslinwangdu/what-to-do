import { createSlice } from '@reduxjs/toolkit';

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    deleteItem: (state, action) => {
      let temp = state.items.filter(item => action.payload._id !== item._id);
      state.items = temp;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const itemActions = itemSlice.actions;

export default itemSlice;