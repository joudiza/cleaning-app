import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

//login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post('token/', {
        username,
        password,
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const authSlice = createSlice({
  name: 'auth',

initialState: {
  access: localStorage.getItem('access') || null,
  refresh: localStorage.getItem('refresh') || null,
  loading: false,
  error: null,
  username: null,
  isStaff: false,
},
  
reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.detail || 'Login failed';
      });
          
  },
});

export default authSlice.reducer;
