const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:5000';
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/fact', async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/fact`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch space fact" });
  }
});

app.listen(PORT, () => {
  console.log(`🛸 Frontend running on port ${PORT}`);
});
