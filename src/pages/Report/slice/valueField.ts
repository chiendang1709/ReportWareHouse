import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listData } from 'interfaces/components';

// export interface listField {

//     listValue :string,
//     id:number

// }
export interface ListField {
  listValueField: Array<any>;
  
};
const initialState: ListField = {
  listValueField:[],
};


export const listValueField = createSlice({
  name: 'listFieldChoose',
  initialState,
  reducers: {
    getlistValueField: (state, action: PayloadAction<any> ) => {
      console.log("listFieldChoose", action.payload);
    },
    showListValueFields: (state, action)=> {
      state.listValueField =action.payload;
    }
  
  },
  
});

export const listValueFieldAction = listValueField.actions;

export default listValueField.reducer;

