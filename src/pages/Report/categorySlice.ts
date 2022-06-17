import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ListData {
  id: number;
  name:string
  
};
export interface ListCategory {
  listCategory: Array<ListData>;
  
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

export const categoryAction= categorySlice.actions;


export default categorySlice.reducer;
