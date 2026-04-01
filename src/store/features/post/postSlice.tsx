/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { Post } from "./types";

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
  },
});

export const { fetchPostsRequest } = postSlice.actions;

export default postSlice.reducer;
