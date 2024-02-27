import { createSlice } from "@reduxjs/toolkit";
import { addTodo } from "./todoAction.js";

const initialState = {
  todos: [
    {
      id: 1,
      todoHeading: "Complete project proposal",
      todoDescription: "Draft and finalize the project proposal for client X.",
      date: "2024-02-27T08:00:00.000Z",
      status: "Pending",
      isFavourite: "F",
    },
    {
      id: 2,
      todoHeading: "Call plumber",
      todoDescription:
        "Schedule an appointment with the plumber to fix the leaking faucet.",
      date: "2024-02-28T10:30:00.000Z",
      status: "Pending",
      isFavourite: "F",
    },
    {
      id: 3,
      todoHeading: "Buy groceries",
      todoDescription:
        "Pick up milk, eggs, bread, and vegetables from the supermarket.",
      date: "2024-02-29T14:00:00.000Z",
      status: "Pending",
      isFavourite: "F",
    },
  ],
  loading: false,
  error: null,
  success: false,
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
  },
});

// export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
