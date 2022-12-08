import React from "react";
import Typography from "@mui/material/Typography";
import Todos from "../../features/todos/Todos";

function Homepage() {
  return (
    <>
      <Typography variant="h1" color="primary" gutterBottom>
        TODO's
      </Typography>
      <Typography variant="subtitle2" gutterBottom color="secondary.dark">
        Say goodbye to procrastination
      </Typography>
      <Todos />
    </>
  );
}

export default Homepage;
