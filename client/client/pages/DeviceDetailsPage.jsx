import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './DeviceDetailsPage.css';

const DeviceDetailsPage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/devices/${id}`);
        setDevice(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch device details');
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  const getKeyFeatures = (sbom) => {
    const keyFeatures = [];
    let count = 0;
  
    // Correct iteration for an array-based sbom
    for (const component of sbom) {
      if (count >= 10) break;
      keyFeatures.push({
        name: component.name,
        version: component.version,
        license: component.license || 'Unknown',
        type: component.type || 'Unknown',
      });
      count++;
    }
  
    return keyFeatures;
  };

  if (loading) return <div className="loading">Loading device details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!device) return <div className="error">Device not found</div>;

  const keyFeatures = getKeyFeatures(device.sbom);

  return (
    <div className="device-details">
      <Link to="/" className="back-link">← Back to Search</Link>
      
      <div className="device-header">
        <h1>{device.name}</h1>
        <div className="device-meta">
          <span className="category">Category: {device.category}</span>
          <span className="os">OS: {device.operatingSystem}</span>
        </div>
      </div>
      
      <div className="sbom-container">
        <h2>Software Bill of Materials</h2>
        
        <div className="key-features">
          <h3>Key Components</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Version</th>
                <th>License</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {keyFeatures.map((feature, index) => (
                <tr key={index}>
                  <td>{feature.name}</td>
                  <td>{feature.version}</td>
                  <td>{feature.license}</td>
                  <td>{feature.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* <div className="full-sbom">
          <h3>Full SBOM Details</h3>
          <pre className="sbom-json">
            {JSON.stringify(device.sbom, null, 2)}
          </pre>
        </div> */}
      </div>
    </div>
  );
};

export default DeviceDetailsPage;