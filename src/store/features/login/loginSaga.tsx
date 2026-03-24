import api from "../../../api";
import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess } from "./loginSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload } from "./types";
import { toast } from "react-toastify";

// fazer login

function* setLoginSaga({ payload }: PayloadAction<LoginPayload>): Generator {
  const { user, navigate } = payload;
  try {
    const { data } = (yield call(api.post, "/login", user)) as {
      data: LoginPayload;
    };

    yield put(loginSuccess(data));
    toast.success("Login realizado com sucesso!");

    yield navigate?.("/home");
  } catch (error) {
    console.error("Erro no login:", error);
    toast.error("E-mail ou senha incorretos.");
  }
}
// token

export default function* loginSaga() {
  yield takeLatest(loginRequest.type, setLoginSaga);
}
