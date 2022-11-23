import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token: null,
  },
  reducers: {
    userCredentials: (state, action) => {
      //   const { user, accessToken } = action.payload;
      //   const { user } = action.payload;
      //   state.user = user;

      state.currentUser = action.payload;
      //   state.token = accessToken;
    },

    logout: (state, action) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { userCredentials, logout } = userSlice.actions;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;
