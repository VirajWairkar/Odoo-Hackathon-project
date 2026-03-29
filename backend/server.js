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

// Test Route
app.get('/', (req, res) => {
  res.send('Backend Running ✅');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Routes ✅ (MOVE HERE)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expense', require('./routes/expense'));

// Start Server (LAST)
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

