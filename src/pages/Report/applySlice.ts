import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface t {
   apply: string; // sẽ thay đổi
  
};
const initialState: t = {
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
