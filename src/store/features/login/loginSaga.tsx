import api from "../../../api";
import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess } from "./loginSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload } from "./types";
import { toast } from "react-toastify";

// fazer login
function* setLoginSaga(action: PayloadAction<LoginPayload>): Generator {
  try {
    const { data: response }: { data: LoginPayload } = yield call(
      api.post,
      "/login",
      {
        email: action.payload.user.email,
        password: action.payload.user.password,
      },
    );

    yield put(loginSuccess(response));
    toast.success("Login realizado com sucesso!");
  } catch (error) {
    console.log("Erro no login:", error);
    toast.error("E-mail ou senha incorretos.");
  }
}

// token

export default function* loginSaga() {
  yield takeLatest(loginRequest.type, setLoginSaga);
}
