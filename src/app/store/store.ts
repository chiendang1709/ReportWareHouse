import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "../../pages/Report/rootSaga";
import tableSlice from "pages/Report/slice/tableSlice";
import categorySlice from "pages/Report/slice/categorySlice";
import changeChart from "pages/Report/slice/changeChart";
import applys  from "pages/Report/slice/applySlice";
import onChartSlice from "pages/Report/slice/onChart";
import onTableSlice  from "pages/Report/slice/onTable";
import listValueField from "pages/Report/slice/valueField";
import getDepartmentSlice from "pages/Report/slice/getDeptSlice";
import getCustomerSlice from "pages/Report/slice/getCusSlice";
import getStaffmentSlice from "pages/Report/slice/getStaffSlice";
import getMWtmentSlice from "pages/Report/slice/getMWSlice";
import filterSlice  from "pages/Report/slice/filterSlice";
import tableDataAction  from "pages/Report/slice/tableDataSlice";
import groupSlice  from "pages/Report/slice/getCtGroupSlice";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
  
   category: categorySlice,
   table: tableSlice,
   filter: filterSlice,
   department: getDepartmentSlice,
   staff: getStaffmentSlice,
   customer: getCustomerSlice,
   mw: getMWtmentSlice,
   listValue: listValueField,
   tableData: tableDataAction,
   typeChart: changeChart,
   onChart: onChartSlice,
   onTable: onTableSlice,
   clickApply : applys,
   categoryGroup: groupSlice,
   
  
   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)

});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

