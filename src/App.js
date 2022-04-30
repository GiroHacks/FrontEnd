import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import HomeScreen from './Screens/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PrivateRoute from "./PrivateRoute";

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
          <Route path="/" element={<PrivateRoute />}/>
          <Route path="/home" element={<HomeScreen />}/>
          <Route exact path='/login' element={<LoginScreen/>}/>
          <Route exact path='/register' element={<RegisterScreen/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
