
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchInputs, setSearchInputs] = useState({
    name: '',
    category: '',
    os: '',
  });

  const handleChange = (e) => {
    setSearchInputs({ ...searchInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInputs);
  };

  return (
    <div className="py-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto my-6 px-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
        
        
        <input
          type="text"
          name="name"
          value={searchInputs.name}
          onChange={handleChange}
          placeholder="Search by Device Name"
          className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        
        <input
          type="text"
          name="category"
          value={searchInputs.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        
        <input
          type="text"
          name="os"
          value={searchInputs.os}
          onChange={handleChange}
          placeholder="Operating System"
          className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        
        <button
          type="submit"
          className="w-full md:w-auto bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          🔎 Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
