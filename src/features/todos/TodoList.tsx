import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import { TTodoList } from "./todosSlice";

interface ITodoList {
  todosList: TTodoList;
  onBtnClick: (description: string) => void;
  onDelete: (id: string) => void;
}

function TodoList(props: ITodoList) {
  const { todosList, onBtnClick, onDelete } = props;
  return (
    <List>
      <TransitionGroup>
        {Object.keys(todosList).map((todoItemKey: string) => {
          const { id, description, isChecked, priority } = todosList[todoItemKey];
          const labelId = `TodoListLabel_${id}`;
          return (
            <Collapse>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      onDelete(id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => {
                    onBtnClick(id);
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isChecked}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={description}
                    secondary={`Priority Level: ${priority ? priority : "-"}`}
                    primaryTypographyProps={{
                      noWrap: true,
                      color: isChecked ? "text.disabled" : "secondary.dark",
                    }}
                    secondaryTypographyProps={{
                      color: isChecked ? "text.disabled" : "primary.dark",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Collapse>
          );
        })}
      </TransitionGroup>
    </List>
  );
}

export default TodoList;
