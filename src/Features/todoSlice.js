import { createSlice } from "@reduxjs/toolkit";
import { addTodo, getTodosOfUser } from "./todoAction.js";

const initialState = {
  todos: [
    {
      id: 1,
      title: "Complete project proposal",
      description: "Draft and finalize the project proposal for client X.",
      date: "2024-02-27T08:00:00.000Z",
      status: "Pending",
    },
    {
      id: 2,
      title: "Call plumber",
      description:
        "Schedule an appointment with the plumber to fix the leaking faucet.",
      date: "2024-02-28T10:30:00.000Z",
      status: "Pending",
      isFavourite: "F",
    },
    {
      id: 3,
      title: "Buy groceries",
      description:
        "Pick up milk, eggs, bread, and vegetables from the supermarket.",
      date: "2024-02-29T14:00:00.000Z",
      status: "Pending",
      isFavourite: "F",
    },
  ],
  todoLoading: false,
  error: null,
  todoSuccess: false,
  t: {},
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        console.log("Payload is " + JSON.stringify(payload));
        state.todos.push(payload),
          (state.loading = false),
          (state.success = true);
      })
      .addCase(addTodo.rejected, (state, { payload }) => {
        (state.error = payload), (state.loading = false);
      });
    builder
      .addCase(getTodosOfUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getTodosOfUser.fulfilled, (state, { payload }) => {
        console.log("Payload is " + JSON.stringify(payload));
        console.log("Payload is " + payload);
        state.todos.push(payload),
          (state.loading = false),
          (state.success = true);
      })
      .addCase(getTodosOfUser.rejected, (state, { payload }) => {
        (state.error = payload), (state.loading = false);
      });
  },
});

// export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
