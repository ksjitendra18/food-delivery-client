import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { userReducer } from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};

// const rootReducer = combineReducers({
//   user: userReducer,
//   c: cartReducer,
// });
const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
