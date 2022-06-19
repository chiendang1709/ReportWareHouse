import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listCategory } from 'interfaces/components';



export interface ListCategory {
  listCategory: Array<listCategory>;
  
};
const initialState: ListCategory = {
    listCategory:[],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategory:() => {
      
    },
    postCategory: (state, action)=> {
      state.listCategory =action.payload;
    }
    
  },
  
});

export const categoryAction= categorySlice.actions;


export default categorySlice.reducer;
