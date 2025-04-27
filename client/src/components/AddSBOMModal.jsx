import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; 

const AddSBOMModal = ({ onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [operatingSystem, setOperatingSystem] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !category || !operatingSystem) {
      alert('Please complete all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('operatingSystem', operatingSystem);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadSuccess(true);
      setTimeout(() => {
        onUploadSuccess();
        onClose();
      }, 2000); 
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-8 relative">

        {uploadSuccess ? (
          
          <div className="flex flex-col items-center justify-center">
            <CheckCircleIcon className="w-20 h-20 text-green-500 animate-bounce" />
            <h2 className="text-2xl font-bold text-green-600 mt-4">
              Upload Successful!
            </h2>
          </div>
        ) : (
          
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Add New SBOM
            </h2>

            <div className="flex flex-col gap-4">
              <input 
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />

              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Device Type</option>
                <option value="Fitness Wearables">Fitness Wearables</option>
                <option value="Smart Home">Smart Home</option>
              </select>

              <input 
                type="text"
                value={operatingSystem}
                onChange={(e) => setOperatingSystem(e.target.value)}
                placeholder="Enter Operating System"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={handleUpload}
                className="bg-[#0d1b2a] hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Upload
              </button>
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddSBOMModal;
