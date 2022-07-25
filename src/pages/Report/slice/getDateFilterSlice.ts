import { SatelliteAlt } from '@mui/icons-material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface DateFilter {
  datefilter: string;
  
};
const initialState: DateFilter = {
    datefilter:"",
  
};

export const getDateFilterSlice = createSlice({
  name: 'Date Filter',
  initialState,
  reducers: {
    getDateFilter:(state, action) => {

        state.datefilter =action.payload;
    },
   
    
  },
  
});

export const dateFilterAction= getDateFilterSlice.actions;


export default getDateFilterSlice.reducer;
