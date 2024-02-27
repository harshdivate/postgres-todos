import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const postTodo = async (
//   title,
//   description,
//   date,
//   userId,
//   status = "incomplete"
// ) => {
//   try {
//     const data = await instance.post(
//       "/api/v1/todo/inserttodo",
//       title,
//       description,
//       date,
//       userId,
//       status
//     );
//     console.log(data.status);

//     if (data.status == "200") {
//       return data.data;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4500",
  headers: {
    "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  // credentials: "true",
});

export const addTodo = createAsyncThunk(
  "todo/addTodo",

  async ({ title, description, date, userId }, { rejectWithValue }) => {
    try {
      console.log(title, description, date, userId);
      const { data } = await instance.post("/api/v1/todo/inserttodo", {
        title,
        description,
        date,
        userId,
      });
      const id = data.data.id;
      const todoObject = { id, title, description, date, userId };
      console.log("Todo object is " + JSON.stringify(todoObject));
      return todoObject;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);
