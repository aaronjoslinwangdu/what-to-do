import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, register } from '../../utils/Api';

// Get user from localStorage
const token = JSON.parse(localStorage.getItem('token'));

const initialState = {
  token: token ? token : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register user
export const registerUser = createAsyncThunk(
  'http://localhost:3001/auth/register', 
  async (user, thunkAPI) => {
    try {
      return await register(user);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString());
      return thunkAPI.rejectWithValue(message);
    }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;