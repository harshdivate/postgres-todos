import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSuccess } from "./todoSlice";

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
      const { data } = await instance.post("/api/v1/todo/inserttodo", {
        title,
        description,
        date,
        userId,
      });
      const id = data.data.id;
      const todoObject = { id, title, description, date, userId };
      // await getTodosOfUser(userId);
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

export const getTodosOfUser = createAsyncThunk(
  "todo/getTodoWithId",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/api/v1/todo/gettodosWithId", {
        params: {
          id: id,
        },
      });
      return Array(...data.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async ({ userId, todoId }, { rejectWithValue }) => {
    try {
      console.log(userId, todoId);
      const data = await instance.post("/api/v1/todo/deleteTodo", {
        userId,
        todoId,
      });
      console.log("Data is" + JSON.stringify(data));
      if (data.status === 200) {
        // await getTodosOfUser(id);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const updateStatusOfTodo = createAsyncThunk(
  "todo/updateStatusOfTodo",
  async ({ option, todoId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/todo/updateStatusOfTodo/", {
        option,
        todoId,
      });
      if (data.status === 200) {
        return true;
      } else {
        throw new Error("Error by harsh");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);
