import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChartType } from 'chart.js';


export interface TypeChart {
    typeChart: ChartType;
  
};
const initialState: TypeChart = {
    typeChart:'bar',
};

export const changeChartSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    getTypeChart:(state, action: PayloadAction<ChartType>) => {
      state.typeChart =action.payload;
    },
   
    
  },
  
});

export const {getTypeChart } = changeChartSlice.actions;


export default changeChartSlice.reducer;
