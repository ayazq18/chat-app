import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Combine from './components/combine';
import Login from './components/login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<Combine />} />
        <Route path='/status' element={<Combine />} />
        <Route path='/tab/:tabName' element={<Combine />} />
      </Routes>
    </Router>
  );
}

export default App;
