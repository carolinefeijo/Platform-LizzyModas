/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload, User } from "./types";

export interface LoginState {
  loading: boolean;
  isSubmitting: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: LoginState = {
  loading: true,
  isSubmitting: false,
  isAuthenticated: false,
  user: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    checkAuthRequest: (state) => {
      state.loading = true;
    },
    logout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
});

export const { loginRequest, logout, loginSuccess, checkAuthRequest } =
  loginSlice.actions;

export default loginSlice.reducer;
