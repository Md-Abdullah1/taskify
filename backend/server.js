const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

//! Import routes
const indexRoute = require('./routes/index.route');

// Initialize app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to task Management System ",
  });
});

// ----Routes----
app.use('/api', indexRoute);



// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     statusCode: 404,
//     url: req.baseUrl,
//     type: req.method,
//     message: "API not found",
//   });
// });


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;