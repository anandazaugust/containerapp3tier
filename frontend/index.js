// index.js (frontend ACA)

const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // npm install node-fetch
const app = express();

const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || 'https://aca10.whitewave-c87ca0ac.uksouth.azurecontainerapps.io'; // Private ACA URL

// 1️⃣ Serve static files (index.html, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public'))); 
// Assuming your index.html is inside /public

// 2️⃣ API endpoint to fetch fact server-side
app.get('/fact', async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/fact`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching fact:', err);
    res.status(500).json({ error: 'Failed to fetch fact' });
  }
});

// 3️⃣ Start server
app.listen(PORT, () => {
  console.log(`🚀 Frontend running at http://localhost:${PORT}`);
});
