import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from 'react';
import './App.css';
import Homepage from './containers/homepage/Homepage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#546e7a',
      light: '#819ca9',
      dark: '#29434e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fdd835',
      light: '#ffff6b',
      dark: '#c6a700',
    },
  },
});

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
