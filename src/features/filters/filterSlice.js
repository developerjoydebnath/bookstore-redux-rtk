import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: '',
  search: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    status: (state, action) => {
      state.status = action.payload;
    },
    search: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { status, search } = filterSlice.actions;
