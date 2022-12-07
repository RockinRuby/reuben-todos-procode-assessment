import React from 'react';
import Box from '@mui/material/Box';
import AddTodo from "../../components/addTodo/AddTodo";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, completeTodo, deleteTodo, selectTodoList, Todo } from "./todosSlice";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import { TransitionGroup } from 'react-transition-group';
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

function Todos() {
    const dispatch = useDispatch();
    const todosList = useSelector(selectTodoList);

    const handleAddTodo = (description: string) => {
        dispatch(addTodo({description}));
    }

    const handleCompleteTodo = (description: string) => {
        dispatch(completeTodo(description));
    }

    const handleDeleteTodo = (description: string) => {
        dispatch(deleteTodo(description));
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} data-testid="todos_wrapper">
            <AddTodo onAdd={handleAddTodo} />
            <Box sx={{ width: { xs: '80vw', md: '600px', xl: '800px' }}}>
                <List>
                    <TransitionGroup>
                        {todosList.map((todoListItem: Todo) => {
                            const descriptionPartial = todoListItem.description.slice(0, 6);
                            const labelId = `TodoListLabel_${descriptionPartial}`;
                            return (
                                <Collapse key={`TodoItem_${descriptionPartial}`}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={()=> handleDeleteTodo(todoListItem.description)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemButton role={undefined} onClick={() => handleCompleteTodo(todoListItem.description)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={todoListItem.completed}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                id={labelId}
                                                primary={todoListItem.description}
                                                secondary={`Priority Level: ${todoListItem.priority||'-'}`}
                                                primaryTypographyProps={{ color: todoListItem.completed ? 'text.disabled' : 'secondary.dark' }}
                                                secondaryTypographyProps={{ color: todoListItem.completed ? 'text.disabled' : 'primary.dark' }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </Collapse>
                            )
                        })}
                    </TransitionGroup>
                    {todosList.length === 0 && <Alert severity="info">No items to display</Alert>}
                </List> 
            </Box>
        </Box>
        
    )
}

export default Todos;