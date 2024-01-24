import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authSlice from "../Features/authSlice";

const persistConfig = {
  key: "harsh", // key for localStorage key
  storage, // storage engine
  whitelist: ["auth"], // reducers to persist, add your reducer names here
};

const reducer = combineReducers({ auth: authSlice });

export const persistedReducer = persistReducer(persistConfig, reducer);
