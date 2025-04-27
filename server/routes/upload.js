const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Device = require('../models/Device');


const upload = multer({ dest: 'uploads/' });


const parseSPDXData = (json) => {
  const data = Array.isArray(json) ? json[0] : json;

  let deviceName = data?.name || 'Unknown Device';

 
  if (deviceName.includes('/')) {
    const parts = deviceName.split('/');
    deviceName = parts[parts.length - 1];
  }

  const spdxVersion = data?.spdxVersion || 'Unknown SPDX Version';
  const dataLicense = data?.dataLicense || 'Unknown License';

  const packages = data?.packages || [];
  const sbom = packages.map(pkg => ({
    name: pkg.name || 'Unknown Package',
    versionInfo: pkg.versionInfo || 'Unknown Version',
    SPDXID: pkg.SPDXID || 'Unknown SPDXID',
    downloadLocation: pkg.downloadLocation || 'Unknown Location'
  }));

  return {
    name: deviceName,
    spdxVersion,
    dataLicense,
    sbom
  };
};


router.post('/', upload.fields([{ name: 'file' }]), async (req, res) => {
  try {
    

   
    const uploadedFile = req.files?.file?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = path.join(__dirname, '..', uploadedFile.path);
    const rawData = fs.readFileSync(filePath);
    const parsedJSON = JSON.parse(rawData);

    const device = parseSPDXData(parsedJSON);

   
    device.category = req.body.category || 'Misc';
    device.operatingSystem = req.body.operatingSystem || 'Unknown OS';

   

    const savedDevice = await Device.create(device);

    fs.unlinkSync(filePath); 
    res.status(200).json(savedDevice);
  } catch (err) {
    console.error(' Upload Server Error:', err);
    res.status(400).json({ error: 'Failed to upload and parse SPDX SBOM file.' });
  }
});

module.exports = router;
