import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Pages/Authenticate/AuthSlice'
import cartSliceReducer from "./Component/Cart/CartSlice"
export const store = configureStore({
  reducer: {
    auth : authSliceReducer,
    cart : cartSliceReducer
  },
})