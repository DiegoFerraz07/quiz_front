import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: null,
      name: '',
      lastName: '',
      email: '',
      role: '',
    },
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
      state.token = token;
    },
    logout: state => {
      state.user = {
        id: null,
        name: '',
        lastName: '',
        email: '',
        role: '',
      };
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
