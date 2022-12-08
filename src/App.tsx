import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import "./App.css";
import Homepage from "./containers/homepage/Homepage";
import { theme } from "./theme";

function App() {
  return (
    <div className="App" data-testid="app_wrapper">
      <ThemeProvider theme={theme}>
        <Homepage />
      </ThemeProvider>
    </div>
  );
}

export default App;
