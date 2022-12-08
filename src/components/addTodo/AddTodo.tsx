import React, { useEffect, useRef, useState } from "react";
import styles from "./AddTodo.module.css";
import z from "zod";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

interface IAddTodoForm {
  label?: string;
  onAdd: (description: string) => void;
}

/*
    Moved the text field into its own component to restrain responsibility as part of SOLID principles.
    Specifically the Single Responsibility Principle
*/
function AddTodo({
  label = "Task description. e.g. Clean the car",
  onAdd,
}: IAddTodoForm) {
  const [todoDescription, setTodoDescription] = useState<string>("");
  const [error, updateError] = useState<string | null>(null);
  /* we use a ref here to prevent dom reload. As it is not required when this variable updates. */
  const isTouched = useRef(false);

  /*
    this will run whenever `todoDescription` changes. So we add an `if (touched)` so that it will only validate after the user has
    submitted/added the todo.
  */
  useEffect(() => {
    if (isTouched.current) validateTodoSchema(todoDescription);
  }, [todoDescription]);

  const todoSchema = z
    .string()
    .min(1, { message: "You need to say something..." });

  const validateTodoSchema = (todoStr: string): boolean => {
    const todoValidity = todoSchema.safeParse(todoStr);
    if (!todoValidity.success) {
      const errors = todoValidity.error.format()._errors;
      updateError(errors.join("|"));
      return false;
    }
    updateError(null);
    return true;
  };

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTodoDescription(e.currentTarget.value);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    isTouched.current = true;
    if (validateTodoSchema(todoDescription)) {
      onAdd(todoDescription);
      isTouched.current = false;
      setTodoDescription("");
    }
  };
  return (
    <Box className={styles.wrapper} sx={{ marginBottom: 4 }}>
      <Box
        component="form"
        sx={{ width: { xs: "80vw", md: "400px", xl: "600px" } }}
        onSubmit={handleAdd}
        noValidate
        autoComplete="off"
      >
        <TextField
          variant="outlined"
          color="secondary"
          label={label}
          sx={{ marginBottom: 2 }}
          name="taskDescription"
          value={todoDescription}
          onChange={handleTodoChange}
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: (
              <Tooltip title="Add to list">
                <IconButton type="submit" color="secondary" size="large">
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            ),
          }}
          fullWidth
        />
      </Box>
    </Box>
  );
}

export default AddTodo;
