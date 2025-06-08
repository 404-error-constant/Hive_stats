import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get("/player/:username", async (req, res) => {
  const username = req.params.username;
  console.log(`Fetching data for: ${username}`);

  try {
    const hiveUrl = `https://api.playhive.com/v0/game/all/${username}`;
    console.log("Requesting:", hiveUrl);

    const hiveResponse = await fetch(hiveUrl);
    const text = await hiveResponse.text(); // Get raw response first
    console.log("Hive raw response:", text);

    if (!hiveResponse.ok) throw new Error("Hive API error");

    const stats = JSON.parse(text);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching Hive data:", error.message);
    res.status(500).json({ error: "Player not found or API error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
