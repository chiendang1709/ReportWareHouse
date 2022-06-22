import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListField {
  listField: string[]; 
  loading:boolean
  
};
const initialState: ListField = {
  listField:[],
  loading:false,
};


export const fieldSlice = createSlice({
  name: 'ListField',
  initialState,
  reducers: {
    getListFields: (state, action: PayloadAction<number>) => {
      state.loading=false;
    },
    showListFields: (state, action) => {
      state.listField= action.payload
      state.loading=true;
    }
  },
  
});

export const fieldAction = fieldSlice.actions;


export default fieldSlice.reducer;

