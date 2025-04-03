// server.js - Main entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/journal', require('./routes/journalRoutes'));
app.use('/api/moods', require('./routes/moodRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/therapists', require('./routes/therapistRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/crisis', require('./routes/crisisRoutes'));

// Simple health check route
app.get('/', (req, res) => {
  res.send('MindHarmony API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));