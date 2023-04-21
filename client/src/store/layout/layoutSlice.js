import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    sidebarHover: false,
    showAddItemForm: false,
    showDeleteItemForm: false,
    itemToDelete: null,
  },
  reducers: {
    sidebarHovered: state => {
      state.sidebarHover = true;
    },
    sidebarNotHovered: state => {
      state.sidebarHover = false;
    },
    showAddItemForm: state => {
      state.showAddItemForm = true;
    },
    hideAddItemForm: state => {
      state.showAddItemForm = false;
    },
    showDeleteItemForm: state => {
      state.showDeleteItemForm = true;
    },
    hideDeleteItemForm: state => {
      state.showDeleteItemForm = false;
    },
    setItemToDelete: (state, action) => {
      state.itemToDelete = action.payload;
    }
  }
});

export const { 
  sidebarHovered, 
  sidebarNotHovered,
  showAddItemForm,
  hideAddItemForm,
  showDeleteItemForm,
  hideDeleteItemForm,
  setItemToDelete,
} = layoutSlice.actions;

export default layoutSlice;