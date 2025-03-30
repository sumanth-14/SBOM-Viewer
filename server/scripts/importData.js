const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Device = require('../models/Device');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for import'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const importLargeJSON = async (filePath) => {
  return new Promise((resolve, reject) => {
    let insertedCount = 0;
    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    let jsonString = '';

    readStream.on('data', (chunk) => {
      jsonString += chunk;
    });

    readStream.on('end', async () => {
      try {
        let data = JSON.parse(jsonString);

        // If JSON is an object, wrap it in an array
        if (!Array.isArray(data)) {
          data = [data];
        }

        // ✅ Filter out objects missing required fields
        const validData = data.filter(item => item.name && item.category && item.operatingSystem && item.sbom);

        if (validData.length === 0) {
          console.warn(`No valid records found in ${filePath}`);
          return resolve();
        }

        // Insert data in batches
        const batchSize = 1000;
        for (let i = 0; i < validData.length; i += batchSize) {
          const batch = validData.slice(i, i + batchSize);
          await Device.insertMany(batch);
          insertedCount += batch.length;
          console.log(`Inserted ${insertedCount}/${validData.length} records from ${filePath}`);
        }

        console.log(`Successfully imported ${insertedCount} records from ${filePath}`);
        resolve();
      } catch (err) {
        reject(`Error processing ${filePath}: ${err.message}`);
      }
    });

    readStream.on('error', (err) => {
      reject(`Error reading file ${filePath}: ${err.message}`);
    });
  });
};

const importData = async () => {
  try {
    await Device.deleteMany({});
    console.log('Existing data cleared');

    const dataDir = path.resolve(__dirname, '../data');
    console.log('Looking for JSON files in:', dataDir);

    const files = ['Fittracker.json','Healthband.json','LightHub.json','SmartTherm.json'];

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      if (fs.existsSync(filePath)) {
        await importLargeJSON(filePath);
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    }

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit();
  } catch (err) {
    console.error('Import error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

importData();
