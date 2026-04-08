const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/stock')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Routes
app.use('/api/products', require('./routes/products'));

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
