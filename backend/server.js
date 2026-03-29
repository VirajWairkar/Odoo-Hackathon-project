const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend Running ✅');
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expense', require('./routes/expense'));

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});