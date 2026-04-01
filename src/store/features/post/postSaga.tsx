import api from "../../../api";
import { call, takeLatest } from "redux-saga/effects";

// import type { PayloadAction } from "@reduxjs/toolkit";

import { fetchPostsRequest } from "./postSlice";

// listar todos os posts
function* fetchPostsSaga(): Generator {
  try {
    const { data: response }: { data: unknown } = yield call(api.get, "/posts");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export default function* postSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
}
