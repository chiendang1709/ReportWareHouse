import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastContainer, toast } from 'react-toastify';


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
    loading:true,
  };
  

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    getFilter: (state, action: PayloadAction<any> ) => {
      state.loading=false
    },
    showFilter: (state, action)=> {
      if(action.payload.length ==0){
        toast.error("No Data!");  
      }else {
        state.listFilter =action.payload;
      }
      state.loading=true


    }
  
  },
  
});

export const filterAction = filterSlice.actions;

export default filterSlice.reducer;

