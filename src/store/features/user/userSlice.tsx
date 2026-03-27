/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadActions, User } from "./types";

export interface UserState {
  loading: boolean;
  isSubmitting: boolean;
  users: User[];
  user: User;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  loading: true,
  users: [],
  isSubmitting: false,
  user: {} as User,
  isAuthenticated: false,
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
    setEditUserResquest: (
      state,
      _action: PayloadActions["setEditUserRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setEditUserSuccess: (
      state,
      action: PayloadActions["setEditUserSuccess"],
    ) => {
      const currentState = current(state);
      const users = currentState.users;
      const userEdit = action.payload.user;
      const newlist = users.map((user) => {
        if (user.id === userEdit.id) {
          return userEdit;
        }
        return user;
      });

      state.users = newlist;
    },
    setDeleteUserRequest: (
      state,
      _action: PayloadActions["setDeleteUserRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setDeleteUserSuccess: (
      state,
      action: PayloadActions["setDeleteUserSuccess"],
    ) => {
      const currentState = current(state);
      const users = currentState.users;

      const newList = users.filter((user) => {
        if (user.id !== action.payload.id) {
          return user;
        }
        return;
      });

      state.users = newList;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  setCreateUserRequest,
  setCreateUserSuccess,
  setEditUserResquest,
  setEditUserSuccess,
  setDeleteUserRequest,
  setDeleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
