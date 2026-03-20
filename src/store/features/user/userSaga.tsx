import api from "../../../api";
import { toast } from "react-toastify";
import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  setCreateUserRequest,
  setCreateUserSuccess,
  setEditUserResquest,
  setEditUserSuccess,
  setDeleteUserRequest,
  setDeleteUserSuccess,
} from "./userSlice";
import type {
  UserResponse,
  CreateUserPayload,
  User,
  EditUserPayload,
  DeleteUserPayload,
} from "./types";

// listar todos os usuários
function* fetchUsersSaga(): Generator {
  try {
    const { data: response }: { data: UserResponse } = yield call(
      api.get,
      "/users",
    );
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

// criar usuário
function* setCreateUserSaga(
  action: PayloadAction<CreateUserPayload>,
): Generator {
  try {
    const { data: response }: { data: User } = yield call(
      api.post,
      "/users",
      action.payload,
    );

    yield put(
      setCreateUserSuccess({
        user: response,
      }),
    );

    toast.success("Usuário criado com sucesso!");
  } catch (error) {
    const err = error as { response?: { status: number } };
    if (err.response?.status === 400) {
      toast.error("Email já cadastrado, tente com outro!");
      return;
    }
    toast.error("Erro ao criar usuário. Tente novamente.");
  }
}

// editar usuario
function* setEditUserSaga(action: PayloadAction<EditUserPayload>): Generator {
  try {
    const id = action.payload.user.id;
    const body = action.payload.user;

    const { data: response }: { data: User } = yield call(
      api.put,
      `/users/${id}`,
      body,
    );
    yield put(
      setEditUserSuccess({
        user: response,
      }),
    );
    toast.success("Usuário editado com sucesso!");
  } catch {
    toast.error("Erro ao editar usuário. Tente novamente.");
  }
}

// deletar usuario
function* setDeleteUserSaga(
  action: PayloadAction<DeleteUserPayload>,
): Generator {
  try {
    const id = action.payload.id;

    yield call(api.delete, `/users/${id}`);
    yield put(
      setDeleteUserSuccess({
        id,
      }),
    );
    toast.success("Usuário deletado com sucesso!");
  } catch {
    toast.error("erro ao deletar usuário!");
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(setCreateUserRequest.type, setCreateUserSaga);
  yield takeLatest(setEditUserResquest.type, setEditUserSaga);
  yield takeLatest(setDeleteUserRequest.type, setDeleteUserSaga);
}
