const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const cookieParser = require('cookie-parser'); // Correct name

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173' // Replace with your client’s URL
})); 

app.use(bodyParser.json());
app.use(cookieParser()); // This should work fine after CORS setup

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo', {});

// Define routes
app.use('/api', taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
