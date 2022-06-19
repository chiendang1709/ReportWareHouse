import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface OnChart {
    onChart: boolean;
  
};
const initialState: OnChart = {
    onChart:false,
};

export const onChartSlice = createSlice({
  name: 'on',
  initialState,
  reducers: {
    getOnChart:(state, action) => {
      state.onChart =action.payload;
    },
   
    
  },
  
});

export const {getOnChart } = onChartSlice.actions;


export default onChartSlice.reducer;