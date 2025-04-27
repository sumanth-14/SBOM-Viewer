import React from "react";
import "./DeviceDetails.css";

const DeviceDetails = ({ device }) => {
  if (!device) return <div>No device selected</div>;

  return (
    <div className="device-details">
      <h2>{device.name}</h2>
      <p><strong>Category:</strong> {device.category}</p>
      <p><strong>Operating System:</strong> {device.operatingSystem}</p>
      <p><strong>SPDX Version:</strong> {device.spdxVersion}</p>
      <p><strong>Data License:</strong> {device.dataLicense}</p>

      <h3>SBOM Components</h3>
      <table>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Version</th>
            <th>SPDX ID</th>
            <th>Download Location</th>
          </tr>
        </thead>
        <tbody>
          {device.sbom && device.sbom.length > 0 ? (
            device.sbom.slice(0, 15).map((pkg, idx) => (
              <tr key={idx}>
                <td>{pkg.name}</td>
                <td>{pkg.versionInfo}</td>
                <td>{pkg.SPDXID}</td>
                <td>{pkg.downloadLocation}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No SBOM components available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceDetails;
