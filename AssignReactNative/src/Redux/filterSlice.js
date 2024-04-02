import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  diet: null,
  cruisine: null,
  protien: null
};


const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateDiet(state, action) {
      state.diet = action.payload;
   
    },
    updateCruisine(state, action){
        state.cruisine = action.payload;
    },
    updateProtien(state, action){
        state.protien = action.payload;
    }

  },
});

export const {updateDiet, updateCruisine , updateProtien} = filterSlice.actions;
export default filterSlice.reducer;
