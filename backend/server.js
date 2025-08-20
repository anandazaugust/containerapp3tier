const express = require("express");
const path = require("path");
const sql = require("mssql");

const app = express();
const PORT = process.env.PORT || 3000;

// SQL Config (read from environment variable)
const config = {
  connectionString: process.env.SQL_CONNECTION,
  options: {
    encrypt: true // required for Azure SQL
  }
};

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// API endpoint to fetch users
app.get("/api/users", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ SQL error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Backend + Frontend running on http://localhost:${PORT}`);
});
