import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./rootSaga";
import tableSlice from "features/tableSlice";
import categorySlice from "features/categorySlice";
import changeChart from "features/changeChart";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
  
   category: categorySlice,
   table: tableSlice,
   typeChart: changeChart
   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

