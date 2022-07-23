import { SatelliteAlt } from '@mui/icons-material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listDepartment } from 'interfaces/components';


export interface ListMW {
  listMW: Array<listDepartment>;
  loading:boolean;
  
};
const initialState: ListMW = {
    listMW:[],
    loading:false,
};

export const getMWSlice = createSlice({
  name: 'MWorkspace',
  initialState,
  reducers: {
    getMW:(state) => {

      
    },
    showMW: (state, action)=> {
      state.listMW =action.payload;
      state.loading= true;
    }
    
  },
  
});

export const mwAction= getMWSlice.actions;


export default getMWSlice.reducer;
