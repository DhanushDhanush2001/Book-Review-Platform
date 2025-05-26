import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
    isAdmin: localStorage.getItem('isAdmin') === 'true', // Convert string to boolean
  },
  reducers: {
    setUser: (state, action) => {
      const { user, token, isAdmin } = action.payload;
      state.user = user;
      state.token = token;
      state.isAdmin = isAdmin;

      localStorage.setItem('userId', user);
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', isAdmin);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;

      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
