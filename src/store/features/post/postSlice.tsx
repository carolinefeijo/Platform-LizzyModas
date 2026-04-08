/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadActions, Post } from "./types";

export interface PostState {
  loading: boolean;
  isSubmitting: boolean;
  posts: Post[];
  postDetails: Post | null;
  loadingDetails: boolean;
}

const initialState: PostState = {
  loading: true,
  isSubmitting: false,
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
    setCreatePostRequest: (
      state,
      _action: PayloadActions["setCreatePostRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setCreatePostSuccess: (
      state,
      action: PayloadActions["setCreatePostSuccess"],
    ) => {
      const newPost = action.payload.post;
      state.posts = [newPost, ...state.posts];
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostDetailsRequest,
  fetchPostDetailsSuccess,
  setCreatePostRequest,
  setCreatePostSuccess,
} = postSlice.actions;

export default postSlice.reducer;
