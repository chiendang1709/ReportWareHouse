import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface OnTool {
    onTool : boolean;
  
};
const initialState: OnTool = {
    onTool :false,
};

export const onToolSlice = createSlice({
  name: 'on',
  initialState,
  reducers: {
    getOnTool:(state) => {
      state.onTool = !state.onTool;
    },
   
    
  },
  
});

export const {getOnTool } = onToolSlice.actions;


export default onToolSlice.reducer;