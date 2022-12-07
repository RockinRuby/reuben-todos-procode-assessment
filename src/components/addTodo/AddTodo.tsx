import React, { useEffect, useState } from 'react';
import styles from './AddTodo.module.css';
import z from 'zod';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

interface IAddTodoForm {
    label?: string;
    onAdd: (todo: string) => void;
}

/*
    Moved the text field into its own component to restrain responsibility as part of SOLID principles.
    Specifically the Single Responsibility Principle
*/
function AddTodo({ label = "Task description. e.g. Clean the car", onAdd }: IAddTodoForm) {
    const [todo, setTodo] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);
    const [error, updateError] = useState<string | null>(null);

    const todoSchema = z.string().min(1, { message: 'You need to say something...' });

    const validateTodoSchema = (todoStr: string): boolean => {
        const todoValidity = todoSchema.safeParse(todoStr??undefined);
        if (!todoValidity.success) {
            const errors = todoValidity.error.format()._errors;
            updateError(errors.join('|'));
            return false;   
        }
        updateError(null);
        return true;
    }

    useEffect(() => {
        if (touched) {
            validateTodoSchema(todo);
        }
    }, [todo])

    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>): void => setTodo(e.currentTarget.value)

    const handleAdd = (): void => {
        setTouched(true);
        const valid = validateTodoSchema(todo);
        if (valid) {
            onAdd(todo);
            setTouched(false);
            setTodo('');
        }
    };
    return (
        <Box className={styles.wrapper} sx={{ marginBottom: 4 }}>
            <Box sx={{ width: { xs: '80vw', md: '400px', xl: '600px' }}}>
                <TextField
                    variant="outlined"
                    color="secondary"
                    label={label}
                    sx={{ marginBottom: 2 }}
                    name="taskDescription"
                    value={todo}
                    onChange={handleTodoChange}
                    error={!!error}
                    helperText={error}
                    InputProps={{
                        endAdornment: (
                            <IconButton type="submit" color="secondary" size="large" onClick={handleAdd}>
                                <AddIcon fontSize="inherit" />
                            </IconButton>
                        )
                    }}
                    fullWidth
                />
            </Box>
        </Box>
    )
}

export default AddTodo;