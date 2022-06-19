import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListField {
  listField: string[]; 
  
};
const initialState: ListField = {
  listField:[],
};


export const fieldSlice = createSlice({
  name: 'ListField',
  initialState,
  reducers: {
    getListFields: (state, action: PayloadAction<number>) => {
    },
    showListFields: (state, action) => {
      state.listField= action.payload
    }
  },
  
});

export const fieldAction = fieldSlice.actions;


export default fieldSlice.reducer;

