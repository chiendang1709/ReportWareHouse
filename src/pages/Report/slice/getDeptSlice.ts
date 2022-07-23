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

export const getDepartmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    getDepartment:(state) => {

      
    },
    showDepartment: (state, action)=> {
      state.listDepartment =action.payload;
      state.loading= true;
    }
    
  },
  
});

export const departmentAction= getDepartmentSlice.actions;


export default getDepartmentSlice.reducer;
