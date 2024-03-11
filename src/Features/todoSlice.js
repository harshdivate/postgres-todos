import { createSlice } from "@reduxjs/toolkit";
import { addTodo, getTodosOfUser } from "./todoAction.js";

const initialState = {
  todos: [],
  todoLoading: false,
  error: null,
  todoSuccess: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSuccess: (state, action) => (state.success = true),
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        console.log("Payload is " + JSON.stringify(payload));
        (state.loading = false), (state.success = true);
      })
      .addCase(addTodo.rejected, (state, { payload }) => {
        (state.error = payload), (state.loading = false);
      });
    builder
      .addCase(getTodosOfUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getTodosOfUser.fulfilled, (state, { payload }) => {
        // state.todos = initialState.todos;
        (state.todos = payload),
          (state.loading = false),
          (state.success = true);
      })
      .addCase(getTodosOfUser.rejected, (state, { payload }) => {
        (state.error = payload), (state.loading = false);
      });
  },
});

export const { setSuccess } = todoSlice.actions;

export default todoSlice.reducer;
