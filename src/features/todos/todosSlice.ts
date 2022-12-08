import { RootState } from "./../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'

type TodoPriority = 1 | 2 | 3 | 4 | 5;

export type TTodo = {
  id: string,
  isChecked: boolean;
  description: string;
  priority?: TodoPriority; // TODO This is an optional feature I may add
};

export type TTodoList = Record<string, TTodo>

export interface TodosState {
  list: TTodoList;
}

const initialState: TodosState = {
  list: {},
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ description: string; priority?: TodoPriority }>
    ) => {
      const id = uuidv4();
      state.list[id] = {
        id,
        isChecked: false,
        description: action.payload.description,
        priority: action.payload.priority || 1,
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      state.list[action.payload].isChecked = !state.list[action.payload].isChecked;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      delete state.list[action.payload];
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;

export const selectTodoList = (state: RootState) => state.todos.list;

export default todosSlice.reducer;
