import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceList from '../components/DeviceList';
import SearchBar from '../src/components/SearchBar';
import AddSBOMModal from '../src/components/AddSBOMModal';
import HeroSection from '../src/components/HeroSection'; 
import { Link } from 'react-router-dom';
import './HomePage.css';
import API_BASE_URL from '../src/api';

const HomePage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

      const res = await axios.get(`${API_BASE_URL}api/devices?${params}`);
      setDevices(res.data);
    } catch (err) {
      console.error('Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleUploadSuccess = () => {
    fetchDevices();
  };
  return (
    <div className="home-page bg-[#415a77] min-h-screen ">
      <HeroSection onUploadClick={() => setShowModal(true)} />

      <div id="search" className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="text-center text-gray-500">Loading devices...</div>
        ) : (
          <DeviceList devices={devices} />
        )}
      </div>

      {showModal && (
        <AddSBOMModal onClose={() => setShowModal(false)} onUploadSuccess={handleUploadSuccess} />
      )}
    </div>
  );
};

export default HomePage;

