const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const path = require('path');

const YELP_API_URL = 'https://api.yelp.com/v3/autocomplete';
const YELP_API_URL2 = 'https://api.yelp.com/v3/businesses/search?';
app.use(express.json());
app.use(cors())

app.use(express.static('dist'));
// Proxy route
app.get('/autocomplete', async (req, res) => {
  try {
    const response = await axios.get(YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`, // Replace with your Yelp API key
      },
      params: req.query, // Pass query parameters to Yelp API
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/results', async (req, res) => {
  try {
    const response = await axios.get(`${YELP_API_URL2}/`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`, // Replace with your Yelp API key
      },
      params: req.query, // Pass query parameters to Yelp API
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','dist', 'index.html'));
});

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  res.status(500).json({
    success: false,
    error: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
