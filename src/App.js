import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginScreen/>}></Route>
        <Route exact path='/register' element={<RegisterScreen/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
