import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listData } from 'interfaces/components';

// export interface listField {

<<<<<<< HEAD
//     listValue :string,
//     id:number

=======
// export interface listField {
 
//     listValue :string,
//     id:number
  
>>>>>>> a99bf0d260d4a5b469b2825dcc5bde5ddc86ecf2
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
     
    },
    showListValueFields: (state, action)=> {
      state.listValueField =action.payload;
    }
  
  },
  
});

export const listValueFieldAction = listValueField.actions;

export default listValueField.reducer;

