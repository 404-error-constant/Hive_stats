import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get("/player/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const hiveResponse = await fetch(`https://api.playhive.com/v0/game/all/all/${username}`);

    const text = await hiveResponse.text(); // get raw response text
    console.log("Hive API response:", text); // debug print

    if (!hiveResponse.ok) throw new Error("Hive API error");

    const stats = JSON.parse(text);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching Hive data:", error);
    res.status(500).json({ error: "Player not found or API error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
