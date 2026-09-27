const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// index.html ausliefern
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// EXE sendet hier die Tunnel-URL hin
app.post("/api/tunnel", (req, res) => {
    fs.writeFileSync("tunnel.json", JSON.stringify(req.body, null, 2));
    res.json({ status: "OK" });
});

// Handy holt hier die Tunnel-URL ab
app.get("/api/tunnel", (req, res) => {
    if (!fs.existsSync("tunnel.json")) {
        return res.json({ pc_api: "https://NO_TUNNEL_URL" });
    }
    const cfg = JSON.parse(fs.readFileSync("tunnel.json", "utf8"));
    res.json(cfg);
});

app.listen(PORT, () => {
    console.log("Render-Server läuft auf Port " + PORT);
});
