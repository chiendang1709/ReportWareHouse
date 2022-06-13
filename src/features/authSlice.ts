import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataState {
  listReport: any;
  
};

const initialState: DataState = {
  listReport:[],

};

export const dataSlice = createSlice({
  name: 'get',
  initialState,
  reducers: {
    getList: () => {
     console.log("lấy")
    },
    postList: (state, action)=> {
      state.listReport =action.payload;
    }
  },
  
});

export const { getList, postList } = dataSlice.actions;


export default dataSlice.reducer;
