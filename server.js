const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// index.html direkt aus dem Ordner ausliefern
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API: Render → Handy → Tunnel-URL deines PCs
app.get("/api/config", (req, res) => {
    try {
        const cfg = JSON.parse(fs.readFileSync("config.json", "utf8"));
        res.json(cfg);
    } catch (e) {
        res.json({ pc_api: "https://NO_TUNNEL_URL_FOUND" });
    }
});

app.listen(PORT, () => {
    console.log("Render-Server läuft auf Port " + PORT);
});
