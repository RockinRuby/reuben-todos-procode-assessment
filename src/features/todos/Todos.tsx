import React from "react";
import Box from "@mui/material/Box";
import AddTodo from "../../components/addTodo/AddTodo";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  selectTodoList,
} from "./todosSlice";
import Alert from "@mui/material/Alert";

import TodoList from "./TodoList";

function Todos() {
  const dispatch = useDispatch();
  const todosList = useSelector(selectTodoList);

  const handleAddTodo = (description: string) => {
    dispatch(addTodo({ description }));
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      data-testid="todos_wrapper"
    >
      <AddTodo onAdd={handleAddTodo} />
      <Box sx={{ width: { xs: "80vw", md: "600px", xl: "800px" } }}>
        <TodoList
          todosList={todosList}
          onBtnClick={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
        {Object.keys(todosList).length === 0 && (
          <Alert severity="info">No items to display</Alert>
        )}
      </Box>
    </Box>
  );
}

export default Todos;
