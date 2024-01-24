// // Create a store
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Features/authSlice.js";
// import persistReducer from "redux-persist/lib/persistReducer";

import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root", // key for localStorage key
  storage, // storage engine
  version: 1,
  // whitelist: ["auth"], // reducers to persist, add your reducer names here
};

const reducer = combineReducers({ auth: authSlice });

export const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
