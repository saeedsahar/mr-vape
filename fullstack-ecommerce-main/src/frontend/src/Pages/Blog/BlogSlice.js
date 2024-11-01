import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBlog: {},
};

export const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBlog } = blogSlice.actions;

export default blogSlice.reducer;
