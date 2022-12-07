import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodoPriority = 1|2|3|4|5;

export type Todo = {
    completed: boolean,
    description: string,
    priority?: TodoPriority, // TODO This is an optional feature I may add
}

export interface TodosState {
    list: Array<Todo>;
}
  
const initialState: TodosState = {
    list: [],
};

const getUpdateIndexWDescription = (state: TodosState, description: string) => {
    return state.list.findIndex((todo: Todo) => description === todo.description);
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ description: string, priority?: TodoPriority}>) => {
            state.list.push({
                completed: false,
                description: action.payload.description,
                priority: action.payload.priority
            });
        },
        completeTodo: (state, action: PayloadAction<string>) => {
            const updateIndex = getUpdateIndexWDescription(state, action.payload);
            state.list[updateIndex].completed = !state.list[updateIndex].completed;
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            const updateIndex = getUpdateIndexWDescription(state, action.payload);
            state.list.splice(updateIndex, 1)
        }
    },
});

export const { addTodo, completeTodo, deleteTodo } = todosSlice.actions;

export const selectTodoList = (state: RootState) => state.todos.list;


export default todosSlice.reducer;