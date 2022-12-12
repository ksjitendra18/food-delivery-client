import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    orderedItems: [],
    currentUser: null,
    userRole: "user",
    userId: null,
    // userIsLoggedIn: false
  },
  reducers: {
    setCredential: (state, action) => {
      state.currentUser = action.payload;
    },
    setRole: (state, action) => {
      state.userRole = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = [];
      state.userId = null;
      state.userRole = "user";
    },

    authStatus: () => {
      const userId = state.userId;

      const userIsLoggedIn = userId !== null;
    },

    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      // state.cart.push({ ...action.payload, quantity: 1 ,});
    },
    addToOrdered: (state, action) => {
      state.orderedItems.push(action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  setCredential,
  setUserId,
  setRole,
  logout,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  addToOrdered,
} = cartSlice.actions;
