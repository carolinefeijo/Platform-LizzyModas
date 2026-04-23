/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { PayloadActions, Post, PostsResponse, UserMeta } from "./types";

export interface PostState {
  loading: boolean;
  isSubmitting: boolean;
  posts: Post[];
  postDetails: Post | null;
  loadingDetails: boolean;
  meta: UserMeta | null;
}

const initialState: PostState = {
  loading: true,
  isSubmitting: false,
  posts: [],
  postDetails: null,
  loadingDetails: false,
  meta: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsRequest: (state, _action: PayloadAction<{ page: number }>) => {
      state.loading = true;
    },

    fetchPostsSuccess: (state, action: PayloadAction<PostsResponse>) => {
      state.loading = false;
      state.meta = action.payload.meta;
      state.posts = action.payload.data.map((post) => {
        const savedLikeStatus = localStorage.getItem(`post_liked_${post.id}`);
        return {
          ...post,
          likes:
            savedLikeStatus !== null ? JSON.parse(savedLikeStatus) : post.likes,
        };
      });
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
    setEditPostRequest: (
      state,
      _action: PayloadActions["setEditPostRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setEditPostSuccess: (
      state,
      action: PayloadActions["setEditPostSuccess"],
    ) => {
      const currentState = current(state);
      const posts = currentState.posts;
      const postEdit = action.payload.post;
      const newList = posts?.map((post) => {
        if (post.id === postEdit.id) {
          return postEdit;
        }
        return post;
      });
      state.posts = newList;
    },
    setDeletePostRequest: (
      state,
      _action: PayloadActions["setDeletePostRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setDeletePostSuccess: (
      state,
      action: PayloadActions["setDeletePostSuccess"],
    ) => {
      const currentState = current(state);
      const posts = currentState.posts;

      const newList = posts.filter((post) => {
        if (post.id !== action.payload.id) {
          return post;
        }
        return;
      });
      state.posts = newList;
    },
    setLikedPostRequest: (
      state,
      _action: PayloadActions["setLikedPostRequest"],
    ) => {
      state.loading = true;
    },
    setLikedPostSuccess: (
      state,
      action: PayloadAction<{ id: number; liked: boolean; likeCount: number }>,
    ) => {
      const { id, liked, likeCount } = action.payload;

      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          const updatedPost = {
            ...post,
            likes: liked,
            count: { ...post.count, likes: likeCount },
          };
          localStorage.setItem(`post_liked_${id}`, JSON.stringify(liked));

          return updatedPost;
        }
        return post;
      });
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
  setEditPostRequest,
  setEditPostSuccess,
  setDeletePostRequest,
  setDeletePostSuccess,
  setLikedPostRequest,
  setLikedPostSuccess,
} = postSlice.actions;

export default postSlice.reducer;
