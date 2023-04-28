import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
}

export const itemSlice = createSlice({
  name: 'item',
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    deleteItem: (state, action) => {
      let temp = state.items.filter(item => action.payload.id !== item._id);
      state.items = temp;
    },
    updateItem: (state, action) => {
      let temp = state.items.filter(item => action.payload._id !== item._id);
      temp.push(action.payload);
      state.items = temp;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const itemActions = itemSlice.actions;

export default itemSlice;