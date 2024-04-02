import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selection: {
    Diet: null,
    Cuisine: null,
    Protein: null, 
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter(state, action) {
      const { property, newValue } = action.payload;


      state.selection = {
        ...state.selection,
        [property]: newValue, 
      };
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
