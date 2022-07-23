import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface OnSidebar {
    onSidebar : boolean;
  
};
const initialState: OnSidebar = {
    onSidebar :false,
};

export const onSidebarSlice = createSlice({
  name: 'on',
  initialState,
  reducers: {
    getOnSidebar:(state) => {
      state.onSidebar = !state.onSidebar;
    },
   
    
  },
  
});

export const {getOnSidebar } = onSidebarSlice.actions;


export default onSidebarSlice.reducer;