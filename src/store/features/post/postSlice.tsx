/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadActions, Post } from "./types";

export interface PostState {
  loading: boolean;
  posts: Post[];
}

const initialState: PostState = {
  loading: true,
  posts: [],
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
  },
});

export const { fetchPostsRequest, fetchPostsSuccess } = postSlice.actions;

export default postSlice.reducer;
