const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes'); // Optional if you have it

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Route Setup
app.use('/api/auth', authRoutes); 
app.use('/api/posts', postRoutes); // Optional

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("helo");
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    console.log("hello");
  })
  .catch(err => console.error('❌ MongoDB connection error:', err.message));
