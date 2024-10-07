import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  trendingProducts: [],
  loading: false,
  query: "",
  pageSize: 6,
  pageIndex: 0,
  length: 0,
  brandId: "",
  categoryId: "",
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setBrandId: (state, action) => {
      state.brandId = action.payload;
      state.categoryId = "";
      state.query = "";
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
      state.brandId = "";
      state.query = "";
    },
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
      state.length = action.payload.length;
    },
    setTrendingProducts: (state, action) => {
      state.trendingProducts = action.payload.products;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
      state.categoryId = "";
      state.brandId = "";
      state.pageIndex = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProducts,
  setQuery,
  setLoading,
  setTrendingProducts,
  setBrandId,
  setCategoryId,
} = productSlice.actions;

export default productSlice.reducer;
