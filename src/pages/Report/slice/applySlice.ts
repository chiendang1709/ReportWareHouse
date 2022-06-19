import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Apply {
   apply: string; 
  
};
const initialState: Apply = {
    apply:"",
};


export const applys = createSlice({
  name: 'apply',
  initialState,
  reducers: {
    getApply: (state, action: PayloadAction<string>) => {
      state.apply = action.payload
    },
  },
  
});

export const apply = applys.actions;


export default applys.reducer;
