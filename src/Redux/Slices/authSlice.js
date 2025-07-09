import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    logout(state) {
      (state.isAuthenticated = false), (state.user = null), (state.role = null);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
