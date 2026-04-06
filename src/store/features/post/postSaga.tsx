import api from "../../../api";
import { call, put, takeLatest } from "redux-saga/effects";

// import type { PayloadAction } from "@reduxjs/toolkit";

import { fetchPostsRequest, fetchPostsSuccess } from "./postSlice";
import type { PostsResponse } from "./types";

// listar todos os posts
function* fetchPostsSaga(): Generator {
  try {
    const { data: response }: { data: PostsResponse } = yield call(
      api.get,
      "/posts",
    );
    yield put(fetchPostsSuccess(response));
    console.log({ response });
  } catch (error) {
    console.log(error);
  }
}

export default function* postSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
}
