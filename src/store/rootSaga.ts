import { all } from "redux-saga/effects";
import userSaga from "./features/user/userSaga";
import productSaga from "./features/product/productSaga";
import loginSaga from "./features/login/loginSaga";
import postSaga from "./features/post/postSaga";

export default function* rootSaga() {
  yield all([userSaga(), productSaga(), loginSaga(), postSaga()]);
}
