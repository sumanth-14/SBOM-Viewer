const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Device = require('./models/Device');
const fs = require('fs');
const path = require('path');


dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    seedAllDevices();
  })
  .catch(err => console.error('MongoDB connection error:', err));

async function seedAllDevices() {
  try {
    const dataDir = path.join(__dirname, 'data');
    const files = ['Fittracker.json', 'Healthband.json', 'LightHub.json', 'SmartTherm.json'];
    const allDevices = [];

    files.forEach(file => {
      const filePath = path.join(dataDir, file);
      const rawData = fs.readFileSync(filePath);
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        allDevices.push(...parsed);
      } else {
        allDevices.push(parsed);
      }
    });

    
    await Device.insertMany(allDevices);
    console.log('All the data successfully inserted into MongoDB Atlas');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.disconnect();
  }
}
