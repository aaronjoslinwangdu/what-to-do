import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarHovered: false,
  showAddItemForm: false,
  showDeleteItemForm: false,
  showLoginForm: false,
  showRegisterForm: false,
  itemToDelete: null,
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setSidebarHovered: (state, action) => {
      state.sidebarHovered = action.payload;
    },
    hideAllForms: state => {
      state.showAddItemForm = false;
      state.showDeleteItemForm = false;
      state.showLoginForm = false;
      state.showRegisterForm = false;
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
    showLoginForm: state => {
      state.showLoginForm = true;
    },
    hideLoginForm: state => {
      state.showLoginForm = false;
    },
    showRegisterForm: state => {
      state.showRegisterForm = true;
    },
    hideRegisterForm: state => {
      state.showRegisterForm = false;
    },
    setItemToDelete: (state, action) => {
      state.itemToDelete = action.payload;
    }
  }
});

export const layoutActions = layoutSlice.actions;

export default layoutSlice;