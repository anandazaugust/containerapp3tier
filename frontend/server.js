const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // For calling backend API

const app = express();
const PORT = process.env.PORT || 5000;

// This should be your backend's internal Container Apps URL
const BACKEND_URL = process.env.BACKEND_URL || 'https://aca10.internal.whitewave-c87ca0ac.uksouth.azurecontainerapps.io/api/fact';

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname)));

// API endpoint that proxies to backend
app.get('/facts', async (req, res) => {
  try {
    const response = await fetch(BACKEND_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    res.status(500).json({ error: 'Failed to fetch fact' });
  }
});

// Serve index.html on root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend server running on port ${PORT}`);
});
