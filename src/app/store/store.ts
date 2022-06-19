import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./rootSaga";
import tableSlice from "pages/Report/tableSlice";
import categorySlice from "pages/Report/categorySlice";
import changeChart from "pages/Report/changeChart";
import onChartSlice from "pages/Report/onChart";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
  
   category: categorySlice,
   table: tableSlice,
   typeChart: changeChart,
   onChart: onChartSlice,
   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

