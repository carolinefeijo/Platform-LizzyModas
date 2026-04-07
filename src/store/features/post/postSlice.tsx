/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadActions, Post } from "./types";

export interface PostState {
  loading: boolean;
  posts: Post[];
  postDetails: Post | null;
  loadingDetails: boolean;
}

const initialState: PostState = {
  loading: true,
  posts: [],
  postDetails: null,
  loadingDetails: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsRequest: (state) => {
      state.loading = true;
      state.posts = [];
    },
    fetchPostsSuccess: (state, action: PayloadActions["FetchPostsSuccess"]) => {
      state.loading = false;
      state.posts = action.payload.data;
    },
    fetchPostDetailsRequest: (
      state,
      _action: PayloadActions["FetchPostDetailsRequest"],
    ) => {
      state.loadingDetails = true;
      state.postDetails = null;
    },
    fetchPostDetailsSuccess: (
      state,
      action: PayloadActions["FetchPostDetailsSuccess"],
    ) => {
      state.loadingDetails = false;
      state.postDetails = action.payload.data;
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostDetailsRequest,
  fetchPostDetailsSuccess,
} = postSlice.actions;

export default postSlice.reducer;
