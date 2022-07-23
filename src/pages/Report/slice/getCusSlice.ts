import { SatelliteAlt } from '@mui/icons-material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listDepartment } from 'interfaces/components';


export interface ListCustomer {
  listCustomer: Array<listDepartment>;
  loading:boolean;
  
};
const initialState: ListCustomer = {
    listCustomer:[],
    loading:false,
};

export const getCustomerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    getCustomer:(state) => {

      
    },
    showCustomer: (state, action)=> {
      state.listCustomer =action.payload;
      state.loading= true;
    }
    
  },
  
});

export const customerAction= getCustomerSlice.actions;


export default getCustomerSlice.reducer;
