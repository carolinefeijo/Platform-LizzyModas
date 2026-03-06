/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, current } from "@reduxjs/toolkit";
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
      const userDelete = action.payload.user;
      const newlist = users.map((user) => {
        if (user.id === userDelete.id) {
          return userDelete;
        }
        return user;
      });

      state.users = newlist;
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
