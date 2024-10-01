import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  items: [],
  total: 0,
  totalPrice: 0.0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    openCart: (state, action) => {
      state.open = action.payload;
    },
    removeItem: (state, action) => {
      let item = state.items.filter((ele) => ele.id == action.payload.id);
      state.items = state.items.filter((ele) => ele.id != action.payload.id);
      state.total = state.total - item[0].quantity;
      state.totalPrice = state.totalPrice - item[0].price * item[0].quantity;
    },
    addItemQuantity: (state, action) => {
      console.log("Add items");
      let index = state.items.findIndex((ele) => ele.id == action.payload.id);
      if (index == -1) {
        let currentItems = state.items;
        let newItem = { ...action.payload };
        newItem.availableQuantity = newItem.quantity - 1;
        newItem.quantity = 1;
        currentItems.push(newItem);

        state.items = currentItems;
        state.total = state.total + 1;
        state.totalPrice = state.totalPrice + newItem.price;
      } else {
        // Login of incrementItemQuantity
        let item = state.items.find((ele) => ele.id == action.payload.id);
        let itemIndex = state.items.findIndex(
          (ele) => ele.id == action.payload.id
        );
        if (item.availableQuantity <= 0) {
          //Show some snackbar
        } else {
          item.quantity++;
          item.availableQuantity--;

          state.items[itemIndex] = item;
          state.total++;
          state.totalPrice += item.price;
        }
      }
    },
    incrementItemQuantity: (state, action) => {
      let item = state.items.find((ele) => ele.id == action.payload.id);
      let itemIndex = state.items.findIndex(
        (ele) => ele.id == action.payload.id
      );
      if (item.availableQuantity <= 0) {
        //Show some snackbar
      } else {
        item.quantity++;
        item.availableQuantity--;

        state.items[itemIndex] = item;
        state.total++;
        state.totalPrice += item.price;
      }
    },
    decreaseItemQuantity: (state, action) => {
      let item = state.items.find((ele) => ele.id == action.payload.id);
      let itemIndex = state.items.findIndex(
        (ele) => ele.id == action.payload.id
      );
      if (!item || item?.quantity <= 0) {
        //Show some snackbar
        // state.items = state.items.filter(ele => ele.id != item.id)
      } else {
        item.quantity--;
        item.availableQuantity++;
        if (item.quantity <= 0) {
          //   state.items = state.items.filter((ele) => ele.id != item.id);
        } else {
          state.items[itemIndex] = item;
        }
        state.total--;
        state.totalPrice -= item.price;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openCart,
  removeItem,
  addItemQuantity,
  decreaseItemQuantity,
  incrementItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
