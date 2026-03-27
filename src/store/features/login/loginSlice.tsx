/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload } from "./types";

export interface LoginState {
  loading: boolean;
  isSubmitting: boolean;
  isAuthenticated: boolean;
}

const initialState: LoginState = {
  loading: true,
  isSubmitting: false,
  isAuthenticated: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    checkAuthRequest: (state) => {
      state.loading = true;
    },
  },
});

export const { loginRequest, loginSuccess, checkAuthRequest } =
  loginSlice.actions;

export default loginSlice.reducer;
