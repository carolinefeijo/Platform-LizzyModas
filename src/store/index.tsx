import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice";
import loginReducer from ".//features/login/loginSlice";
import postReducer from "./features/post/postSlice";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    product: productReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
