import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 menu : [],
}

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    setMenu: (state , action) => {
        state.menu = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMenu } = homeSlice.actions

export default homeSlice.reducer