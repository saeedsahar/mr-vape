import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Pages/Authenticate/AuthSlice";
import cartSliceReducer from "./Pages/Cart/CartSlice";
import productSliceReducer from "./Pages/Product/ProductSlice";
import homeSlice from "./Pages/HomeSlice";
import mainNavSlice from "./Component/MainNaivgationComp/MainNavSlice";
import blogSlice from "./Pages/Blog/BlogSlice";
import { createSlice } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    cart: cartSliceReducer,
    product: productSliceReducer,
    home: homeSlice,
    mainNav: mainNavSlice,
    blog: blogSlice,
  },
});



