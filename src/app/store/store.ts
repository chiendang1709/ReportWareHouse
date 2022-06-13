import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./rootSaga";
import dataSlice from "features/authSlice";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
   data: dataSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

