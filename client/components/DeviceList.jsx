import React from 'react';
import { Link } from 'react-router-dom';

const DeviceList = ({ devices }) => {
  if (devices.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No devices found matching your search criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto py-10 px-4">
      {devices.map(device => (
        <Link 
          to={`/device/${device._id}`} 
          key={device._id} 
          className="block bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden group 
                     transition-all duration-300 hover:scale-105 hover:border-gray-700 hover:shadow-2xl"
        >
          
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-gray-100 opacity-40 group-hover:opacity-60 rounded-xl -z-10"></div>

          
          <h3 className="text-2xl font-bold text-gray-800 mb-3 truncate">
            {device.name}
          </h3>

          
          <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mb-2">
            {device.category || "Unknown Category"}
          </span>

          
          <p className="text-sm text-gray-500">
            OS: {device.operatingSystem || "Unknown OS"}
          </p>

          
          <div className="mt-4 text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition">
            View Details →
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DeviceList;
