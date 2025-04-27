
import React from 'react';

const HeroSection = ({ onUploadClick }) => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
       
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-gray-700">SBOM Viewer</span>
        </h1>

        
        <p className="text-lg md:text-2xl text-gray-600 mb-10">
          Manage your Software Bill of Materials with Ease 🚀
        </p>

        
        <div className="flex justify-center space-x-6">
          <button 
            onClick={onUploadClick}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
          >
            ➕ Add New SBOM
          </button>

          <a href="#search">
            <button className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
              🔍 Search Devices
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

