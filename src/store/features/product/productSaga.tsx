import api from "../../../api";
import { call, put, takeLatest } from "redux-saga/effects";
import type { ProductsResponse } from "../product/types";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  setCreateProductRequest,
  setCreateProductSuccess,
} from "./productSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateProductPayload, Product } from "./types";
import { toast } from "react-toastify";

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

// criar produto
function* setCreateProductSaga(
  action: PayloadAction<CreateProductPayload>,
): Generator {
  try {
    const { data: response }: { data: Product } = yield call(
      api.post,
      "/products",
      action.payload,
    );

    yield put(
      setCreateProductSuccess({
        product: response,
      }),
    );

    toast.success("Produto criado com sucesso!");
  } catch {
    toast.error("Erro ao criar produto. Tente novamente.");
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductSaga);
  yield takeLatest(setCreateProductRequest.type, setCreateProductSaga);
}
