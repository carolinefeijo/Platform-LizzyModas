/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, current } from "@reduxjs/toolkit";
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
    setEditProductResquest: (
      state,
      _action: PayloadActions["setEditProductRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setEditProductSuccess: (
      state,
      action: PayloadActions["setEditProductSuccess"],
    ) => {
      const currentState = current(state);
      const products = currentState.products;
      const productEdit = action.payload.product;
      const newList = products?.map((product) => {
        if (product.id === productEdit.id) {
          return productEdit;
        }
        return product;
      });
      state.products = newList;
    },
    setDeleteProductRequest: (
      state,
      _action: PayloadActions["setDeleteProductRequest"],
    ) => {
      state.isSubmitting = true;
    },
    setDeleteProductSuccess: (
      state,
      action: PayloadActions["setDeleteProductSuccess"],
    ) => {
      const currentState = current(state);
      const products = currentState.products;

      const newList = products.filter((product) => {
        if (product.id !== action.payload.id) {
          return product;
        }
        return;
      });
      state.products = newList;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  setCreateProductRequest,
  setCreateProductSuccess,
  setEditProductResquest,
  setEditProductSuccess,
  setDeleteProductRequest,
  setDeleteProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
