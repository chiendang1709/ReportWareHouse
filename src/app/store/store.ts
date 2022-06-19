import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "../../pages/Report/rootSaga";
import tableSlice from "pages/Report/tableSlice";
import categorySlice from "pages/Report/categorySlice";
import changeChart from "pages/Report/changeChart";
<<<<<<< HEAD
import onChartSlice from "pages/Report/onChart";
=======
import  applys  from "pages/Report/applySlice";
import  onChartSlice from "pages/Report/onChart";
>>>>>>> be46798e1e25341e1f520b19acbbc550e54a09c7

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
  
   category: categorySlice,
   table: tableSlice,
   typeChart: changeChart,
   onChart: onChartSlice,
<<<<<<< HEAD
=======
   clickApply : applys
>>>>>>> be46798e1e25341e1f520b19acbbc550e54a09c7
   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

