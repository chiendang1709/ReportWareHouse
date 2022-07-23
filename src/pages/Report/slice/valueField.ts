import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ListField {
  listValueField: Array<string>;
  listCheckField: string;
  loading:boolean
  
};
const initialState: ListField = {
  listValueField:[],
  listCheckField:"",
  loading:true
};


export const listValueField = createSlice({
  name: 'listFieldChoose',
  initialState,
  reducers: {
    getlistValueField: (state, action: PayloadAction<string> ) => {
      state.listCheckField =action.payload
      state.loading=false
    },
    showListValueFields: (state, action)=> {
      console.log("ffiler",action.payload);
      
      if(action.payload.length ===0){
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

