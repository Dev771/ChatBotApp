import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Authorization/Login/Login';
import Registeration from './Components/Authorization/Registeration/Registeration';
import Home from './Components/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route element={<Login />} path='/login' exact />
            <Route element={<Registeration />} path='/register' exact />
            <Route element={<Home />} path='/' exact />
        </Routes>
    </BrowserRouter>
  )
}

export default App