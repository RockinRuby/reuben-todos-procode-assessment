import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { addTodo, toggleTodo, deleteTodo, selectTodoList } from "./todosSlice";
import AddTodo from "../../components/addTodo/AddTodo";

import TodoListItem from "./TodoListItem";

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
        <List>
          <TransitionGroup>
            {Object.keys(todosList).map((todoItemKey: string) => (
              /* We need to have the <Collapse> as the first child of <TransitionGroup> for it to work */
              <Collapse key={`TodoItem_Collapse_${todoItemKey}`}>
                <TodoListItem
                  todo={todosList[todoItemKey]}
                  onBtnClick={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
        {Object.keys(todosList).length === 0 && (
          <Alert severity="info">No items to display</Alert>
        )}
      </Box>
    </Box>
  );
}

export default Todos;
