const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  operatingSystem: { type: String },  
  spdxVersion: { type: String },
  dataLicense: { type: String },
  sbom: [
    {
      name: { type: String },
      versionInfo: { type: String },
      SPDXID: { type: String },
      downloadLocation: { type: String },
    }
  ]
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;

