import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListTable {
  listReport: any;
  
};
const initialState: ListTable = {
  listReport:[],
};


export const tableSlice = createSlice({
  name: 'get',
  initialState,
  reducers: {
    getList: () => {
     console.log("lấy")
    },
    postList: (state, action)=> {
      state.listReport =action.payload;
    }
  },
  
});

export const {getList, postList } = tableSlice.actions;


export default tableSlice.reducer;
