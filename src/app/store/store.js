import { createWrapper } from "next-redux-wrapper";
import {productsReducer} from "./slices/dummySlice";
import { orderReducer } from "./slices/orderSlice";
import { leftNavbarReducer } from "./slices/leftNavbarSlice";
const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const reducers = combineReducers({
  products: productsReducer,
  orders: orderReducer,
  leftNavbar: leftNavbarReducer
});

export const makeStore = (options) =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(getDefaultMiddleware()),
    ...options,
    devTools: process.env.NODE_ENV !== 'production',
  });

export const store = makeStore();

export const wrapper = createWrapper(makeStore);
