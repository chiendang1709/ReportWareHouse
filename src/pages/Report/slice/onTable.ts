import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface OnTable {
    onTable: boolean;
  
};
const initialState: OnTable = {
    onTable:false,
};

export const onTableSlice = createSlice({
  name: 'on',
  initialState,
  reducers: {
    getOnTable:(state, action) => {
      state.onTable =action.payload;
    },
   
    
  },
  
});

export const {getOnTable } = onTableSlice.actions;


export default onTableSlice.reducer;