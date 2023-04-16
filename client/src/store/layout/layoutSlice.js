import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    sidebarHover: false,
  },
  reducers: {
    sidebarHovered: state => {
      state.sidebarHover = true;
    },
    sidebarNotHovered: state => {
      state.sidebarHover = false;
    }
  }
});

export const { 
  sidebarHovered, 
  sidebarNotHovered 
} = layoutSlice.actions;

export default layoutSlice;