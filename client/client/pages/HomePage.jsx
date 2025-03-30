import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceList from '../components/DeviceList';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    os: ''
  });

  useEffect(() => {
    fetchDevices();
  }, [searchParams]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchParams.name) params.append('name', searchParams.name);
      if (searchParams.category) params.append('category', searchParams.category);
      if (searchParams.os) params.append('os', searchParams.os);
      
      const res = await axios.get(`http://localhost:5000/api/devices?${params}`);
      setDevices(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching devices:', err);
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="home-page">
      <div className='homeheader'>
      <h1>SBOM Viewer</h1>
      <p>Search and view Software Bill of Materials for various devices</p></div>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <div className="loading">Loading devices...</div>
      ) : (
        <DeviceList devices={devices} />
      )}
    </div>
  );
};

export default HomePage;