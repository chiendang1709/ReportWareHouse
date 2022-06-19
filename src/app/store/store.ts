import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "../../pages/Report/rootSaga";
import tableSlice from "pages/Report/tableSlice";
import categorySlice from "pages/Report/categorySlice";
import changeChart from "pages/Report/changeChart";
import  applys  from "pages/Report/applySlice";
import  onChartSlice from "pages/Report/onChart";
import fieldSlice from "pages/Report/fieldSlice";
import listValueField from "pages/Report/valueField";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
  
   category: categorySlice,
   table: tableSlice,
   field: fieldSlice,
   listValue: listValueField,
   typeChart: changeChart,
   onChart: onChartSlice,
   clickApply : applys
   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

