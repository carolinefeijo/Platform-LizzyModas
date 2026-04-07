import api from "../../../api";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchPostDetailsRequest,
  fetchPostDetailsSuccess,
  fetchPostsRequest,
  fetchPostsSuccess,
} from "./postSlice";
import type { Post, PostsResponse } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

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

// mostrar detalhes do post
function* fetchPostDetailsSaga(action: PayloadAction<Post>): Generator {
  try {
    const { id } = action.payload;
    const { data: response }: { data: Post } = yield call(
      api.get,
      `/posts/${id}`,
    );
    yield put(fetchPostDetailsSuccess({ data: response }));
    console.log({ modal: id, response });
  } catch (error) {
    console.log(error);
  }
}

export default function* postSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(fetchPostDetailsRequest.type, fetchPostDetailsSaga);
}
