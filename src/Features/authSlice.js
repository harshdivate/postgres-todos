import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./authAction.js";

const initialState = {
  // uses will login using email and password
  // if successful i will use the reduces to store the login information
  userInfo: {},
  loading: false,
  userToken: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      // state.userInfo = action.payload;
      console.log(action);
      state.userToken = action.payload.accessToken;
      state.success = true;
    },
    setInitialState: (state, action) => {
      (state.userToken = null),
        (state.success = false),
        (state.userInfo = {}),
        (state.loading = false),
        localStorage.removeItem("persist:root");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        (state.userInfo = payload),
          (state.userToken = payload.accesstoken),
          (state.loading = false),
          (state.success = true);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        (state.error = payload), (state.loading = false);
      });
    builder.addCase(logoutUser.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      (state.userInfo = {}),
        (state.success = false),
        (state.userToken = null),
        (state.loading = false);
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      (state.error = payload), (state.loading = false);
    });
  },
});

export const { setUser, setInitialState } = authSlice.actions;

export default authSlice.reducer;
