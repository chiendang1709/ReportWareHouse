import { SatelliteAlt } from '@mui/icons-material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listDepartment } from 'interfaces/components';


export interface ListStaff {
  listStaff: Array<listDepartment>;
  loading:boolean;
  
};
const initialState: ListStaff = {
    listStaff:[],
    loading:false,
};

export const getStaffSlice = createSlice({
  name: 'Staff',
  initialState,
  reducers: {
    getStaff:(state) => {

      
    },
    showStaff: (state, action)=> {
      state.listStaff =action.payload;
      state.loading= true;
    }
    
  },
  
});

export const staffAction= getStaffSlice.actions;


export default getStaffSlice.reducer;
