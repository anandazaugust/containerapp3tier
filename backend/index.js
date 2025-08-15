const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const facts = [
  "A day on Venus is longer than a year on Venus.",
  "There are more trees on Earth than stars in the Milky Way.",
  "Neutron stars can spin 600 times per second.",
  "Saturn could float in water because it's mostly gas.",
  "One million Earths could fit inside the Sun."
];

app.get('/api/fact', (req, res) => {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  res.json({ fact });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on port ${PORT}`);
});
