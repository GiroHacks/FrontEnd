import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#167db7',
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/login' element={<LoginScreen/>}></Route>
          <Route exact path='/register' element={<RegisterScreen/>}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
