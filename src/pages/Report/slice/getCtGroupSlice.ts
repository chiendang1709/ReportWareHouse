import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Group {
   group: string; 
  
};
const initialState: Group = {
    group:"",
};


export const groupSlice = createSlice({
  name: 'categoryGroup',
  initialState,
  reducers: {
    getGroup: (state, action: PayloadAction<string>) => {
      state.group = action.payload
    },
  },
  
});

export const groupAction = groupSlice.actions;


export default groupSlice.reducer;
