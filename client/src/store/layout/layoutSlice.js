import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarHovered: false,
  showAddItemForm: false,
  showDeleteForm: false,
  showLoginForm: false,
  showRegisterForm: false,
  showProfileForm: false,
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
      state.showDeleteForm = false;
      state.showProfileForm = false;
    },
    setShowAddItemForm: (state, action) => {
      state.showAddItemForm = action.payload;
    },
    setShowDeleteForm: (state, action) => {
      state.showDeleteForm = action.payload;
    },
    setShowProfileForm: (state, action) => {
      state.showProfileForm = action.payload;
    }
  }
});

export const layoutActions = layoutSlice.actions;

export default layoutSlice;