const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

// Backend API (Container App / SQL-backed API)
const BACKEND_URL =
  process.env.BACKEND_URL ||
  "https://acabackend.happymushroom-d88cb2c7.uksouth.azurecontainerapps.io/api/users"; // replace with your backend internal URL

// Serve static files (index.html, style.css)
app.use(express.static(path.join(__dirname)));

// Proxy endpoint for users
app.get("/api/users", async (req, res) => {
  try {
    const response = await fetch(BACKEND_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching backend:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Serve index.html explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend running at http://localhost:${PORT}`);
});
