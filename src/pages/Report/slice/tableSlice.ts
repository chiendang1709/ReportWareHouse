import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listTable } from 'interfaces/components';


export interface ListTable {
  listTable: Array<listTable>;
 
};


const initialState: ListTable = {
   listTable:[],
 
};


export const tableSlice = createSlice({
  name: 'ListTable',
  initialState,
  reducers: {
    getListTables: (state, action: PayloadAction<number>) => {
       console.log('kiem tra',action.payload);
    },
    showListTables: (state, action) => {
      state.listTable= action.payload
    }
  },
 
  
});

export const tableAction = tableSlice.actions;


export default tableSlice.reducer;
