const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

router.get('/', async (req, res) => {
  try {
    const { name, category, os } = req.query;
    let query = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    
    if (os) {
      query.operatingSystem = { $regex: os, $options: 'i' };
    }
    
    const devices = await Device.find(query).select('name category operatingSystem sbom');
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/devices/common-packages
router.get('/common-packages', async (req, res) => {
  try {
    const devices = await Device.find();
    const packageCount = {};

    devices.forEach(device => {
      const seen = new Set();
      device.sbom?.forEach(pkg => {
        if (pkg.name && !seen.has(pkg.name)) {
          packageCount[pkg.name] = (packageCount[pkg.name] || 0) + 1;
          seen.add(pkg.name);
        }
      });
    });

    const topPackages = Object.entries(packageCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json(topPackages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;