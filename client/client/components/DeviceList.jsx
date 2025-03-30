import React from 'react';
import { Link } from 'react-router-dom';
import './DeviceList.css';

const DeviceList = ({ devices }) => {
  if (devices.length === 0) {
    return <div className="no-results">No devices found matching your search criteria.</div>;
  }

  return (
    <div className="device-list">
      {devices.map(device => (
        <Link to={`/device/${device._id}`} key={device._id} className="device-card">
          <h3>{device.name}</h3>
          <div className="device-info">
            <span className="device-category">{device.category}</span>
            <span className="device-os">{device.operatingSystem}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DeviceList;