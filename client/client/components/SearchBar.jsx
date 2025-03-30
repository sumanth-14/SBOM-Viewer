import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [os, setOs] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ name, category, os });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-inputs">
          <div className="input-group">
            <label htmlFor="name">Device Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search by name..."
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Search by category..."
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="os">Operating System</label>
            <input
              type="text"
              id="os"
              value={os}
              onChange={(e) => setOs(e.target.value)}
              placeholder="Search by OS..."
            />
          </div>
        </div>
        
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;