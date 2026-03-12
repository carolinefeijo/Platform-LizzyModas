import { createSlice } from "@reduxjs/toolkit";
import type { PayloadActions, Product } from "../user/types";

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
  },
});

export const { fetchProductsRequest, fetchProductsSuccess } =
  productSlice.actions;

export default productSlice.reducer;
