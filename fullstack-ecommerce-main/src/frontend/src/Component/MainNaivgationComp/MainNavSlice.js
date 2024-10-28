import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  messsgae: "",
  type: "",
  openDialog: false,
  dialogType: "",
  productId: "",
};

export const mainNavSlice = createSlice({
  name: "mainNavSlice",
  initialState,
  reducers: {
    setSnackBar: (state, action) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    setDialogStates: (state, action) => {
      state.openDialog = true;
      state.dialogType = action.payload.type;
      state.productId = action.payload.id;
    },
    resetDialog: (state, action) => {
      state.openDialog = false;
      state.dialogType = "";
      state.productId = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSnackBar, setDialogStates, resetDialog } =
  mainNavSlice.actions;

export default mainNavSlice.reducer;
