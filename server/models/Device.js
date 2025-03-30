const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  operatingSystem: {
    type: String,
    required: true,
    index: true
  },
  sbom: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Device', DeviceSchema);