const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();

const YELP_API_URL = 'https://api.yelp.com/v3/autocomplete';
const YELP_API_URL2 = 'https://api.yelp.com/v3/businesses/search?';
app.use(express.json());
app.use(cors())
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
