import { SatelliteAlt } from '@mui/icons-material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listDepartment } from 'interfaces/components';


export interface ListDepartment {
  listDepartment: Array<listDepartment>;
  loading:boolean;
  
};
const initialState: ListDepartment = {
    listDepartment:[],
    loading:false,
};

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    getDepartment:(state) => {
     state.loading = false;
      
    },
    showDepartment: (state, action)=> {
      state.listDepartment =action.payload;
      state.loading= true;
    }
    
  },
  
});

export const departmentAction= departmentSlice.actions;


export default departmentSlice.reducer;
