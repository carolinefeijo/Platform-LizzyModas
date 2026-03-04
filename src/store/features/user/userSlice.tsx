/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadActions, User } from "./types";

export interface UserState {
  loading: boolean;
  isSubmitting: boolean;
  users: User[];
  user: User;
}

const initialState: UserState = {
  loading: true,
  users: [],
  isSubmitting: false,
  user: {} as User,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.users = [];
    },
    fetchUsersSuccess: (state, action: PayloadActions["FetchUsersSuccess"]) => {
      state.loading = false;
      state.users = action.payload.data;
    },
    setCreateUserRequest: (
      state,
      _action: PayloadActions["SetCreateUserRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setCreateUserSuccess: (
      state,
      action: PayloadActions["setCreateUserSuccess"],
    ) => {
      const newUser = action.payload.user;
      state.users = [newUser, ...state.users];
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  setCreateUserRequest,
  setCreateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
