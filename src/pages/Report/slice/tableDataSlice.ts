import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface tableData {
    listData: Array<any>;
    loading:boolean;
    
  };
  const initialState: tableData = {
    listData:[],
    loading:false,
  };
  

export const tableDataSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    getListTableData: (state, action: PayloadAction<any> ) => {
        state.listData =action.payload;
    },
  },
  
});

export const tableDataAction = tableDataSlice.actions;

export default tableDataSlice.reducer;

