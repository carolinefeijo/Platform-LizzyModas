/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload } from "./types";

export interface LoginState {
  loading: boolean;
  isSubmitting: boolean;
  //   user: LoginPayload;
}

const initialState: LoginState = {
  loading: true,
  isSubmitting: false,
  //   user: {} as LoginPayload,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.loading = false;
    },
  },
});

export const { loginRequest, loginSuccess } = loginSlice.actions;

export default loginSlice.reducer;
