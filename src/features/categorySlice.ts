import { createSlice, PayloadAction } from '@reduxjs/toolkit';


<<<<<<< HEAD
export interface ListCategory {
  listCategory: any;
=======
export interface ListData {
  id: number;
  name:string
  
};
export interface ListCategory {
  listCategory: Array<ListData>;
>>>>>>> 539587522d5e7fe804e07fcb74485550f3496122
  
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
