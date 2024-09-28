import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open : false,
    messsgae : "",
    type : ""
}

export const mainNavSlice = createSlice({
  name: 'mainNavSlice',
  initialState,
  reducers: {
    setSnackBar : (state , action) => {
      state.open = action.payload.open
      state.message = action.payload.message
      state.type = action.payload.type
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { setSnackBar } = mainNavSlice.actions

export default mainNavSlice.reducer