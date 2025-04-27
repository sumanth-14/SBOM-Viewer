import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

//import Header from '../components/Header.jsx';
import HomePage from '../pages/HomePage';
import DeviceDetailsPage from '../pages/DeviceDetailsPage';
import ComparePage from '../pages/ComparePage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/device/:id" element={<DeviceDetailsPage />} />
            <Route path="/compare" element={<ComparePage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
