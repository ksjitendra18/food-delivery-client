import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";

import { userReducer } from "./userSlice";
const newstore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default newstore;
