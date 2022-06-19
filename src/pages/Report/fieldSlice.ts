import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListField {
  listReport: any; // sẽ thay đổi
  
};
const initialState: ListField = {
  listReport:[],
};


export const fieldSlice = createSlice({
  name: 'ListField',
  initialState,
  reducers: {
    getListFields: (state, action: PayloadAction<number>) => {
    },
    showListFields: (state, action) => {
      state.listReport= action.payload
    }
  },
  
});

export const fieldAction = fieldSlice.actions;


export default fieldSlice.reducer;

