import api from "../../../api";
import { toast } from "react-toastify";
import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { checkAuthRequest, loginRequest, loginSuccess } from "./loginSlice";
import type { LoginPayload } from "./types";

function* setLoginSaga({ payload }: PayloadAction<LoginPayload>): Generator {
  const { user, navigate } = payload;
  try {
    const { data } = (yield call(api.post, "/login", user)) as {
      data: LoginPayload;
    };

    const token = data.token;

    if (token) {
      localStorage.setItem("@App:token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(loginSuccess(data));
      toast.success("Login realizado com sucesso!");

      if (navigate) {
        yield call(navigate, "/home");
      }
    } else {
      toast.error("Token não recebido do servidor.");
    }
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { error?: string } } };
    const message =
      axiosError.response?.data?.error || "Erro ao realizar login";

    toast.error(message);
  }
}

function* checkAuthSaga(): Generator {
  try {
    const token = localStorage.getItem("@App:token");

    if (!token) return;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const { data } = yield call(api.get, "/me");
    yield put(loginSuccess(data));
  } catch {
    localStorage.removeItem("@App:token");
    delete api.defaults.headers.Authorization;
  }
}

export default function* loginSaga() {
  yield takeLatest(loginRequest.type, setLoginSaga);
  yield takeLatest(checkAuthRequest.type, checkAuthSaga);
}
