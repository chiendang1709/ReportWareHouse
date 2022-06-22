import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listData } from 'interfaces/components';

// export interface listField {

// export interface listField {
 
//     listValue :string,
//     id:number
  
// }
export interface ListField {
  listValueField: Array<any>;
  loading:boolean
  
};
const initialState: ListField = {
  listValueField:[],
  loading:false
};


export const listValueField = createSlice({
  name: 'listFieldChoose',
  initialState,
  reducers: {
    getlistValueField: (state, action: PayloadAction<any> ) => {
      state.loading=false
    },
    showListValueFields: (state, action)=> {
      state.listValueField =action.payload;
      state.loading=true
    }
  
  },
  
});

export const listValueFieldAction = listValueField.actions;

export default listValueField.reducer;

