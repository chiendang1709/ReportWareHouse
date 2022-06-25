import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// export interface Filter {
//    params: string ,
//    year :string|boolean,
//    month : string|boolean,
//    year2 : string|boolean,
//    month2 : string|boolean,
//    department :string|boolean,
//    loading ?:boolean
  
// };
// const initialState: Filter = {
//     params: "" ,
//     year :"",
//     month : "",
//     year2 : "",
//     month2 : "",
//     department :"",
//     loading: true
// };
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
        state.loading=true
    },
  },
  
});

export const tableDataAction = tableDataSlice.actions;

export default tableDataSlice.reducer;

