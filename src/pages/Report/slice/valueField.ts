import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ListField {
  listValueField: Array<string>;
  loading:boolean
  
};
const initialState: ListField = {
  listValueField:[],
  loading:true
};


export const listValueField = createSlice({
  name: 'listFieldChoose',
  initialState,
  reducers: {
    getlistValueField: (state, action: PayloadAction<string> ) => {

    },
    showListValueFields: (state, action)=> {
      if(action.payload.length ==0){
        state.listValueField =[];
       
      }else {
        state.listValueField =action.payload;
      }
      state.loading=true
    }
  
  },
  
});

export const listValueFieldAction = listValueField.actions;

export default listValueField.reducer;

