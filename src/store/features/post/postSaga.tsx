import api from "../../../api";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchPostDetailsRequest,
  fetchPostDetailsSuccess,
  fetchPostsRequest,
  fetchPostsSuccess,
  setCreatePostRequest,
  setCreatePostSuccess,
  setEditPostRequest,
  setEditPostSuccess,
} from "./postSlice";
import type {
  CreatePostPayload,
  EditPostPayload,
  Post,
  PostsResponse,
} from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// listar todos os posts
function* fetchPostsSaga(): Generator {
  try {
    const { data: response }: { data: PostsResponse } = yield call(
      api.get,
      "/posts",
    );
    yield put(fetchPostsSuccess(response));
    // console.log({ response });
  } catch (error) {
    console.log(error);
  }
}

// criar um novo post
function* setCreatePostSaga(
  action: PayloadAction<CreatePostPayload>,
): Generator {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.name);
    formData.append("price", String(action.payload.price));
    formData.append("category", action.payload.category);
    formData.append("description", action.payload.description || "");
    formData.append("size", action.payload.size || "");
    formData.append("userId", String(action.payload.userId));
    if (action.payload.image) {
      formData.append("image", action.payload.image);
    }

    const { data: response }: { data: Post } = yield call(
      api.post,
      "/posts",
      formData,
    );
    yield put(setCreatePostSuccess({ post: response }));
  } catch (error) {
    console.log(error);
  }
}

// mostrar detalhes do post
function* fetchPostDetailsSaga(action: PayloadAction<Post>): Generator {
  try {
    const { id } = action.payload;
    const { data: response }: { data: Post } = yield call(
      api.get,
      `/posts/${id}`,
    );
    yield put(fetchPostDetailsSuccess({ data: response }));
  } catch (error) {
    console.log(error);
  }
}

// editar post
function* setEditPostSaga(action: PayloadAction<EditPostPayload>): Generator {
  try {
    const id = action.payload.post.id;
    const body = action.payload.post;

    const { data: response }: { data: Post } = yield call(
      api.put,
      `/posts/${id}`,
      body,
    );
    yield put(
      setEditPostSuccess({
        post: response,
      }),
    );
    toast.success("Produto editado com sucesso!");
  } catch {
    toast.error("Erro ao editar produto. Tente novamente.");
  }
}

export default function* postSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(fetchPostDetailsRequest.type, fetchPostDetailsSaga);
  yield takeLatest(setCreatePostRequest.type, setCreatePostSaga);
  yield takeLatest(setEditPostRequest.type, setEditPostSaga);
}
