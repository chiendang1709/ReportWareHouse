import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "../../pages/Report/rootSaga";
import tableSlice from "pages/Report/slice/tableSlice";
import categorySlice from "pages/Report/slice/categorySlice";
import changeChart from "pages/Report/slice/changeChart";
import  applys  from "pages/Report/slice/applySlice";
import  onChartSlice from "pages/Report/slice/onChart";
import onTableSlice  from "pages/Report/slice/onTable";
import fieldSlice from "pages/Report/slice/fieldSlice";
import listValueField from "pages/Report/slice/valueField";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
  
   category: categorySlice,
   table: tableSlice,
   field: fieldSlice,
   listValue: listValueField,
   typeChart: changeChart,
   onChart: onChartSlice,
   onTable: onTableSlice,
   clickApply : applys
   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

