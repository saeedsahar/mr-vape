import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
  email : "",
  surname : "",
  name : "",
  password : "",
  token : "",
  mobile : "",
  shippingAddress : "",
  country : "",
  town : "",
  postcode : "",
  city : ""
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    signin: (state , action) => {
        localStorage.setItem("accessToken" , action.payload)
      state.token = action.payload
    },
    setUserDetails : (state , action) => {
        state.isLogged = true
        state.email = action.payload.email
        state.surname = action.payload.surname
        state.name = action.payload.name
        // state.password = action.payload.password
    },
    updateUserData : (state , action) => {
      state[action.payload.key] = action.payload.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { signin, setUserDetails, updateUserData } = authSlice.actions

export default authSlice.reducer