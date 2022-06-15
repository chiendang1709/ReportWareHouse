import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListTable {
  listReport: any; // sẽ thay đổi
  
};
const initialState: ListTable = {
  listReport:[],
};


export const tableSlice = createSlice({
  name: 'ListTable',
  initialState,
  reducers: {
    getListTables: (state, action: PayloadAction<number>) => {
      console.log('kiem tra',action.payload);
    },
    postListTables: (state, action) => {
      state.listReport= action.payload
    }
  },
  
});

export const tableAction = tableSlice.actions;


export default tableSlice.reducer;
