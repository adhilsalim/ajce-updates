const express = require("express");
const scrapeData = require("./scraper");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/api/updates", async (req, res) => {
  try {
    const data = await scrapeData();
    res.status(200).send(data);
  } catch {
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
