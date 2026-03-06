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
import api from "../../../api";
import type {
  UserResponse,
  CreateUserPayload,
  User,
  EditUserPayload,
  DeleteUserPayload,
} from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

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
  yield console.log("Criar usuário:", action.payload);
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

    console.log("Usuário criado com sucesso:", response);
  } catch (error) {
    console.log("erro ao criar usuário:", error);
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
    console.log("Usuário editado com sucesso:", response);
  } catch (error) {
    console.log("erro ao editar usuário:", error);
  }
}

// deletar usuario
function* setDeleteUserSaga(
  action: PayloadAction<DeleteUserPayload>,
): Generator {
  try {
    const id = action.payload.user.id;
    const body = action.payload.user;

    const { data: response }: { data: User } = yield call(
      api.delete,
      `/users/${id}`,
      { data: body },
    );
    yield put(
      setDeleteUserSuccess({
        user: response,
      }),
    );
    console.log("Usuário deletado com sucesso:", response);
  } catch (error) {
    console.log("erro ao deletado usuário:", error);
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(setCreateUserRequest.type, setCreateUserSaga);
  yield takeLatest(setEditUserResquest.type, setEditUserSaga);
  yield takeLatest(setDeleteUserRequest.type, setDeleteUserSaga);
}
