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
    
    const devices = await Device.find(query).select('name category operatingSystem');
    res.json(devices);
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