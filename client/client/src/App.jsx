import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header.jsx';
import HomePage from '../pages/HomePage';
import DeviceDetailsPage from '../pages/DeviceDetailsPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/device/:id" element={<DeviceDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;