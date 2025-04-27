import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../src/api';

const ComparePage = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceA, setSelectedDeviceA] = useState(null);
  const [selectedDeviceB, setSelectedDeviceB] = useState(null);
  const [deviceAData, setDeviceAData] = useState(null);
  const [deviceBData, setDeviceBData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}api/devices`);
        setDevices(res.data);
      } catch (err) {
        console.error('Failed to fetch devices:', err);
      }
    };
    fetchDevices();
  }, []);

  const handleCompare = async () => {
    if (!selectedDeviceA || !selectedDeviceB) {
      alert('Please select two devices.');
      return;
    }
    if (selectedDeviceA._id === selectedDeviceB._id) {
      alert('Please select two DIFFERENT devices.');
      return;
    }

    try {
      const resA = await axios.get(`http://localhost:5000/api/devices/${selectedDeviceA._id}`);
      const resB = await axios.get(`http://localhost:5000/api/devices/${selectedDeviceB._id}`);
      setDeviceAData(resA.data);
      setDeviceBData(resB.data);
    } catch (err) {
      console.error('Comparison fetch failed:', err);
      alert('Comparison failed. Try again.');
    }
  };

  const handleClear = () => {
    setSelectedDeviceA(null);
    setSelectedDeviceB(null);
    setDeviceAData(null);
    setDeviceBData(null);
  };

  const highlightDifference = (a, b) => {
    return a !== b ? 'bg-yellow-100' : '';
  };

  return (
    <div className="bg-[#415a77] min-h-screen px-6 py-10">

      
      <button 
        onClick={() => navigate('/')}
        className="text-gray-300 hover:text-white mb-8 flex items-center"
      >
        ← Back
      </button>


<div className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8 mb-10">
  <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
    Select Devices to Compare
  </h3>

  <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
    <select
      value={selectedDeviceA?.name || ''}
      onChange={(e) => {
        const selected = devices.find(d => d.name === e.target.value);
        setSelectedDeviceA(selected || null);
      }}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 w-60"
    >
      <option value="">Select Device A</option>
      {devices.map(device => (
        <option key={device._id} value={device.name}>{device.name}</option>
      ))}
    </select>

    <select
      value={selectedDeviceB?.name || ''}
      onChange={(e) => {
        const selected = devices.find(d => d.name === e.target.value);
        setSelectedDeviceB(selected || null);
      }}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 w-60"
    >
      <option value="">Select Device B</option>
      {devices.map(device => (
        <option key={device._id} value={device.name}>{device.name}</option>
      ))}
    </select>
  </div>

  <div className="flex justify-center gap-6">
    <button 
      onClick={handleCompare}
      className="bg-[#0d1b2a] hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
    >
      Compare
    </button>

    <button 
      onClick={handleClear}
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300"
    >
      Clear
    </button>
  </div>
</div>


      
      {deviceAData && deviceBData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{deviceAData.name}</h3>
            <div className="text-gray-600 mb-2">
              <strong>Category:</strong> {deviceAData.category}
            </div>
            <div className="text-gray-600 mb-2">
              <strong>OS:</strong> {deviceAData.operatingSystem}
            </div>
            <div className="text-gray-600 mb-2">
              <strong>SPDX Version:</strong> {deviceAData.spdxVersion}
            </div>
            <div className="text-gray-600 mb-2">
              <strong>Data License:</strong> {deviceAData.dataLicense}
            </div>
          </div>

          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{deviceBData.name}</h3>
            <div className="text-gray-600 mb-2">
              <strong>Category:</strong> {deviceBData.category}
            </div>
            <div className="text-gray-600 mb-2">
              <strong>OS:</strong> {deviceBData.operatingSystem}
            </div>
            <div className="text-gray-600 mb-2">
              <strong>SPDX Version:</strong> {deviceBData.spdxVersion}
            </div>
            <div className="text-gray-600 mb-2">
              <strong>Data License:</strong> {deviceBData.dataLicense}
            </div>
          </div>
        </div>
      )}

      
      {deviceAData && deviceBData && (
        <div className="mt-16 max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Top 5 SBOM Components Compared</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Feature</th>
                  <th className="px-6 py-3">{deviceAData.name}</th>
                  <th className="px-6 py-3">{deviceBData.name}</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-b">
                      <td className="px-6 py-4">Package Name #{index + 1}</td>
                      <td className={`px-6 py-4 ${highlightDifference(deviceAData.sbom[index]?.name, deviceBData.sbom[index]?.name)}`}>
                        {deviceAData.sbom[index]?.name || 'N/A'}
                      </td>
                      <td className={`px-6 py-4 ${highlightDifference(deviceBData.sbom[index]?.name, deviceAData.sbom[index]?.name)}`}>
                        {deviceBData.sbom[index]?.name || 'N/A'}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4">Version</td>
                      <td className={`px-6 py-4 ${highlightDifference(deviceAData.sbom[index]?.versionInfo, deviceBData.sbom[index]?.versionInfo)}`}>
                        {deviceAData.sbom[index]?.versionInfo || 'N/A'}
                      </td>
                      <td className={`px-6 py-4 ${highlightDifference(deviceBData.sbom[index]?.versionInfo, deviceAData.sbom[index]?.versionInfo)}`}>
                        {deviceBData.sbom[index]?.versionInfo || 'N/A'}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
