import api from "../../../api";
import { call, put, takeLatest } from "redux-saga/effects";
import type { ProductsResponse } from "../user/types";
import { fetchProductsRequest, fetchProductsSuccess } from "./productSlice";

function* fetchProductSaga(): Generator {
  try {
    const { data: response }: { data: ProductsResponse } = yield call(
      api.get,
      "/products",
    );
    yield put(fetchProductsSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductSaga);
}
