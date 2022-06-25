import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listData } from 'interfaces/components';


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
export interface Filter {
    listFilter: Array<any>;
    loading:boolean;
    
  };
  const initialState: Filter = {
    listFilter:[],
    loading:false,
  };
  

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    getFilter: (state, action: PayloadAction<any> ) => {
      state.loading=false
    },
    showFilter: (state, action)=> {
      state.listFilter =action.payload;
      state.loading=true
    }
  
  },
  
});

export const filterAction = filterSlice.actions;

export default filterSlice.reducer;

