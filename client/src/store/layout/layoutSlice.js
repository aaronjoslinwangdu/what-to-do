import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    sidebarHover: false,
    showAddItemForm: false,
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
    }
  }
});

export const { 
  sidebarHovered, 
  sidebarNotHovered,
  showAddItemForm,
  hideAddItemForm
} = layoutSlice.actions;

export default layoutSlice;