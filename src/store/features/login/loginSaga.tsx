import api from "../../../api";
import { toast } from "react-toastify";
import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess } from "./loginSlice";
import type { LoginPayload } from "./types";

// fazer login
// function* setLoginSaga({ payload }: PayloadAction<LoginPayload>): Generator {
//   const { user, navigate } = payload;
//   try {
//     const { data } = (yield call(api.post, "/login", user)) as {
//       data: LoginPayload;
//     };
//     yield put(loginSuccess(data));
//     toast.success("Login realizado com sucesso!");
//     yield navigate?.("/home");
//   } catch (error: unknown) {
//     const axiosError = error as { response?: { data?: { error?: string } } };

//     const apiMessage =
//       axiosError.response?.data?.error || "Erro ao realizar login";
//     toast.error(apiMessage);
//   }
// }

function* setLoginSaga({ payload }: PayloadAction<LoginPayload>): Generator {
  const { user, navigate } = payload;

  try {
    const { data } = (yield call(api.post, "/login", user)) as {
      data: LoginPayload;
    };

    // 1. Salva o token no LocalStorage para persistência
    if (data.user.token) {
      localStorage.setItem("@App:token", data.user.token);
    }

    yield put(loginSuccess(data));
    toast.success("Login realizado com sucesso!");

    if (navigate) {
      yield call(navigate, "/home");
    }
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { error?: string } } };
    const message =
      axiosError.response?.data?.error || "Erro ao realizar login";

    toast.error(message);
  }
}
// token

export default function* loginSaga() {
  yield takeLatest(loginRequest.type, setLoginSaga);
}
