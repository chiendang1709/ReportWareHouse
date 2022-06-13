import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ListCategory {
  listCategory: any;
  
};
const initialState: ListCategory = {
    listCategory:[],
};

export const categorySlice = createSlice({
  name: 'get',
  initialState,
  reducers: {
    getCategory:() => {
    },
    postCategory: (state, action)=> {
      state.listCategory =action.payload;
    }
    
  },
  
});

export const {getCategory, postCategory } = categorySlice.actions;


export default categorySlice.reducer;
