// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();
// const app = express();

// require('dotenv').config();  

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });



// app.use(cors());
// app.use(express.json());


// mongoose.connect(process.env.MONGO_URI)
//   .then(() =>{ console.log('MongoDB connected');})
//   .catch(err => console.error('MongoDB connection error:', err));


// app.use('/api/devices', require('./routes/devices'));
// app.use('/api/upload', require('./routes/upload'));


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/devices', require('./routes/devices'));
app.use('/api/upload', require('./routes/upload'));

// Base route (Important for Vercel health check)
app.get('/', (req, res) => {
  res.send('SBOM Backend API is Running ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
