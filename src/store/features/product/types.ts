export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
};

type UserMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ProductsResponse = {
  data: Product[];
  meta: UserMeta;
};

export type CreateProductPayload = {
  name: string;
  description: string;
  price: number;
  createdById: number;
};

export type EditProductPayload = {
  id: string;
  product: Product;
};

export type DeleteProductPayload = {
  id: number;
};

export type PayloadActions = {
  FetchProductsSuccess: {
    type: string;
    payload: ProductsResponse;
  };

  FetchProductSearchRequest: {
    type: string;
    payload: string;
  };

  setCreateProductRequest: {
    type: string;
    payload: CreateProductPayload;
  };

  setCreateProductSuccess: {
    type: string;
    payload: {
      product: Product;
    };
  };
  setEditProductRequest: {
    type: string;
    payload: {
      product: Partial<Product>;
    };
  };
  setEditProductSuccess: {
    type: string;
    payload: {
      product: Product;
    };
  };
  setDeleteProductRequest: {
    type: string;
    payload: {
      id: number;
    };
  };
  setDeleteProductSuccess: {
    type: string;
    payload: {
      id: number;
    };
  };
};
