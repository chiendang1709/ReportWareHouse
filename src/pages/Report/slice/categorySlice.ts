import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listCategory } from 'interfaces/components';



export interface ListCategory {
  listCategory: Array<listCategory>;
  loading:boolean;
  
};
const initialState: ListCategory = {
    listCategory:[],
    loading:false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategory:(state) => {
     state.loading = false;
      
    },
    postCategory: (state, action)=> {
      state.listCategory =action.payload;
      state.loading= true;
    }
    
  },
  
});

export const categoryAction= categorySlice.actions;


export default categorySlice.reducer;
