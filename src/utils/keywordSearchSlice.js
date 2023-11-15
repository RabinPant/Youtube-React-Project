import { createSlice } from "@reduxjs/toolkit";

const keywordSearch = createSlice({
  name: "keyword",
  initialState: {
    isClick: false,
    query: "",
  },
  reducers: {
    isClick: (state, action) => {
      state.isClick = action.payload;
    },
    query: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { isClick, query } = keywordSearch.actions;
export default keywordSearch.reducer;
