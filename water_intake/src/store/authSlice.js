import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [],
    user: null
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      window.localStorage.setItem('users', JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.userId === action.payload.userId);
      if (index !== -1) {
        state.users[index] = action.payload;
        window.localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    setActiveUser: (state, action) => {
      state.users.forEach(user => {
        if (user.userId === action.payload.userId) {
          user.active = true;
          state.user = user;
        } else {
          user.active = false;
        }
      });
      window.localStorage.setItem('users', JSON.stringify(state.users));
    },
    removeUser: (state) => {
      if (state.user) {
        const index = state.users.findIndex(user => user.userId === state.user.userId);
        if (index !== -1) {
          state.users[index].active = false;
          state.user = null;
          window.localStorage.setItem('users', JSON.stringify(state.users));
        }
      }
    }
  }
});

export const { addUser, updateUser, setActiveUser, removeUser } = authSlice.actions;

export default authSlice.reducer;

