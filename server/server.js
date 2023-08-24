const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();

const YELP_API_URL = 'https://api.yelp.com/v3/autocomplete';

app.use(express.json());
app.use(cors())
// Proxy route
app.get('/yelp/autocomplete', async (req, res) => {
  try {
    const response = await axios.get(YELP_API_URL, {
      headers: {
        Authorization: `Bearer bbn-En5Rz60M8L_SbdNHSEWeHBS3En1cHkBwoG6ZprRstpBP5-BcM_eu-Uf8Cp6bkiL9K3LDFt30fveMOOLdwVHZVbv5AYlHjLVwUH1KjdLY9rYg0qe4WsdSjSrkZHYx`, // Replace with your Yelp API key
      },
      params: req.query, // Pass query parameters to Yelp API
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/yelp/autocomplete/locations', async (req, res) => {
  try {
    const response = await axios.get(`${YELP_API_URL}/locations`, {
      headers: {
        Authorization: `Bearer bbn-En5Rz60M8L_SbdNHSEWeHBS3En1cHkBwoG6ZprRstpBP5-BcM_eu-Uf8Cp6bkiL9K3LDFt30fveMOOLdwVHZVbv5AYlHjLVwUH1KjdLY9rYg0qe4WsdSjSrkZHYx`, // Replace with your Yelp API key
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
