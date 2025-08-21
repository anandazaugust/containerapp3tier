const express = require("express");
const sql = require("mssql");

const app = express();
const PORT = process.env.PORT || 3000;

// Reuse SQL connection pool
let poolPromise;
async function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(process.env.SQL_CONNECTION);
  }
  return poolPromise;
}

// API endpoint
app.get("/api/users", async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ SQL error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Optional: health check for ACA liveness probe
app.get("/health", (req, res) => res.send("OK"));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend API running on port ${PORT}`);
});
