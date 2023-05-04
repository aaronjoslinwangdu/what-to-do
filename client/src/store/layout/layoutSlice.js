import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarHovered: false,
  showAddItemForm: false,
  showDeleteItemForm: false,
  showLoginForm: false,
  showRegisterForm: false,
  showProfileForm: false,
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
      state.showProfileForm = false;
    },
    setShowAddItemForm: (state, action) => {
      state.showAddItemForm = action.payload;
    },
    setShowDeleteItemForm: (state, action) => {
      state.showDeleteItemForm = action.payload;
    },
    setShowProfileForm: (state, action) => {
      state.showProfileForm = action.payload;
    },
    setItemToDelete: (state, action) => {
      state.itemToDelete = action.payload;
    }
  }
});

export const layoutActions = layoutSlice.actions;

export default layoutSlice;