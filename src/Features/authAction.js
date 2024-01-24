import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4500",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  credentials: "true",
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/users/login", {
        email: email,
        password: password,
      });
      return data.data[0];
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/users/logout", {
        email: email,
      });
      localStorage.removeItem("persist:root");
      console.log("Removed the persisted data");
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
