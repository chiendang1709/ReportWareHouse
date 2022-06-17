import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./rootSaga";
<<<<<<< HEAD
import tableSlice from "pages/Report/tableSlice";
import categorySlice from "pages/Report/categorySlice";
import changeChart from "pages/Report/changeChart";
import  applys  from "pages/Report/applySlice";
import  onChartSlice from "pages/Report/onChart";
=======
import tableReducer from "features/tableSlice";
import categorySlice from "features/categorySlice";
import changeChart from "features/changeChart";
>>>>>>> f5865cf01a7b40f0b6e25521d3d4e90c2714cc23

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
  
   category: categorySlice,
<<<<<<< HEAD
   table: tableSlice,
   typeChart: changeChart,
   onChart: onChartSlice,
   clickApply : applys
=======
   table: tableReducer,
   typeChart: changeChart
>>>>>>> f5865cf01a7b40f0b6e25521d3d4e90c2714cc23
   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

