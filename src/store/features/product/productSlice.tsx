/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadActions, Product } from "./types";

export interface ProductState {
  loading: boolean;
  isSubmitting: boolean;
  products: Product[];
  product: Product;
}

const initialState: ProductState = {
  loading: true,
  isSubmitting: false,
  products: [],
  product: {} as Product,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
    fetchProductsSuccess: (
      state,
      action: PayloadActions["FetchProductsSuccess"],
    ) => {
      state.loading = false;
      state.products = action.payload.data;
    },
    setCreateProductRequest: (
      state,
      _action: PayloadActions["setCreateProductRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setCreateProductSuccess: (
      state,
      action: PayloadActions["setCreateProductSuccess"],
    ) => {
      const newProduct = action.payload.product;
      state.products = [newProduct, ...state.products];
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  setCreateProductRequest,
  setCreateProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
