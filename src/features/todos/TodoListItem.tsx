import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import { TTodo } from "./todosSlice";

interface ITodoListItem {
  todo: TTodo;
  onBtnClick: (description: string) => void;
  onDelete: (id: string) => void;
}

function TodoListItem(props: ITodoListItem) {
  const { id, isChecked, description, priority } = props.todo;
  const labelId = `TodoListLabel_${id}`;
  return (
    <ListItem
      secondaryAction={
        <Tooltip title="Delete item">
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              props.onDelete(id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      }
    >
      <Tooltip title="Toggle checked">
        <ListItemButton
          role={undefined}
          onClick={() => {
            props.onBtnClick(id);
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
      </Tooltip>
    </ListItem>
  );
}

export default TodoListItem;
