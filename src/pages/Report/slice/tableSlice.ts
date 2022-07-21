import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listTable } from 'interfaces/components';


export interface ListTable {
  listTable: Array<listTable>;
  loading:boolean;
 
};


const initialState: ListTable = {
   listTable:[],
   loading: false,
 
};


export const tableSlice = createSlice({
  name: 'ListTable',
  initialState,
  reducers: {
    getListTables: () => {
        console.log("hello");
        
    },
    showListTables: (state, action) => {
      console.log("hello",action.payload);
      state.listTable= action.payload
      state.loading= true
    }
  },
 
  
});

export const tableAction = tableSlice.actions;


export default tableSlice.reducer;
