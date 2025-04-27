import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../src/api';

const DeviceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}api/devices/${id}`);
        setDevice(res.data);
      } catch (err) {
        console.error('Failed to fetch device:', err);
      }
    };

    fetchDevice();
  }, [id]);

  if (!device) {
    return <div className="text-center text-gray-300 mt-20">Loading device details...</div>;
  }

  return (
    <div className="bg-[#415a77] min-h-screen px-6 py-10">
      
      <button 
        onClick={() => navigate(-1)}
        className="text-gray-300 hover:text-white mb-6 flex items-center"
      >
        ← Back
      </button>

      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{device.name}</h1>
        
       
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-4 py-2 rounded-full">
            {device.category || 'Unknown Category'}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-4 py-2 rounded-full">
            {device.operatingSystem || 'Unknown OS'}
          </span>
        </div>

        
        <div className="space-y-2 text-gray-600 text-sm">
          <div><strong>SPDX Version:</strong> {device.spdxVersion}</div>
          <div><strong>Data License:</strong> {device.dataLicense}</div>
          <div><strong>SBOM Components:</strong> {device.sbom.length}</div>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">SBOM Components</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th scope="col" className="px-6 py-3">Package Name</th>
                <th scope="col" className="px-6 py-3">Version</th>
                <th scope="col" className="px-6 py-3">SPDX ID</th>
                <th scope="col" className="px-6 py-3">Download Location</th>
              </tr>
            </thead>
            <tbody>
              {device.sbom.slice(0, 50).map((pkg, idx) => (
                <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{pkg.name || 'N/A'}</td>
                  <td className="px-6 py-4">{pkg.versionInfo || 'N/A'}</td>
                  <td className="px-6 py-4">{pkg.SPDXID || 'N/A'}</td>
                  <td className="px-6 py-4">{pkg.downloadLocation || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default DeviceDetailsPage;




