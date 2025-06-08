import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/player/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const response = await fetch(`https://api.playhive.com/api/game/all/${username}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Player not found or API error" });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Hive API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
