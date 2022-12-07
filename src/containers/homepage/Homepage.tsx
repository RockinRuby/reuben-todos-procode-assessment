import React from 'react';
import Typography from '@mui/material/Typography';
import Todos from "../../features/todos/Todos";

function Homepage() {
    return (
        <div>
            <Typography variant='h1' color="primary" gutterBottom>TODO's</Typography>
            <Typography variant='subtitle2' gutterBottom color="secondary.dark">Say goodbye to procrastination</Typography>
            <Todos />
        </div>
    )
}

export default Homepage;