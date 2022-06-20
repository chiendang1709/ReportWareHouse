import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListField {
<<<<<<< HEAD
  listField: any; // sẽ thay đổi
=======
  listField: string[]; 
>>>>>>> a99bf0d260d4a5b469b2825dcc5bde5ddc86ecf2
  
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

