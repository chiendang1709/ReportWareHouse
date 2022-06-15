import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./rootSaga";
import tableSlice from "features/tableSlice";
import categorySlice from "features/categorySlice";
<<<<<<< HEAD
=======
import changeChart from "features/changeChart";
>>>>>>> 539587522d5e7fe804e07fcb74485550f3496122

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
  
   category: categorySlice,
<<<<<<< HEAD
   table: tableSlice
=======
   table: tableSlice,
   typeChart: changeChart
>>>>>>> 539587522d5e7fe804e07fcb74485550f3496122
   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

